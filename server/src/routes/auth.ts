import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateRegistration, validateLogin } from '../middleware/userValidation';

const router = Router();

// Путь к файлу с данными пользователей
const usersPath = path.join(__dirname, '../data/users.json');

// Регистрация нового пользователя
router.post('/register', validateRegistration, async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Чтение существующих пользователей
    const usersData = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(usersData);

    // Проверка, существует ли пользователь с таким email
    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        error: 'Пользователь уже существует',
        details: 'Пользователь с таким email уже зарегистрирован'
      });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Добавление пользователя в массив
    users.push(newUser);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    // Создание JWT токена
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Отправка ответа без пароля
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

// Вход пользователя
router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Чтение существующих пользователей
    const usersData = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(usersData);

    // Поиск пользователя по email
    const user = users.find((u: any) => u.email === email);
    if (!user) {
      return res.status(401).json({
        error: 'Неверные учетные данные',
        details: 'Пользователь с таким email не найден'
      });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Неверные учетные данные',
        details: 'Неверный пароль'
      });
    }

    // Создание JWT токена
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Отправка ответа без пароля
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Ошибка при входе пользователя' });
  }
});

// Получение информации о текущем пользователе
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Требуется авторизация',
        details: 'Токен не предоставлен'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

    // Чтение существующих пользователей
    const usersData = fs.readFileSync(usersPath, 'utf8');
    const users = JSON.parse(usersData);

    // Поиск пользователя по ID
    const user = users.find((u: any) => u.id === decoded.userId);
    if (!user) {
      return res.status(404).json({
        error: 'Пользователь не найден',
        details: 'Пользователь с таким ID не существует'
      });
    }

    // Отправка ответа без пароля
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Ошибка при получении информации о пользователе:', error);
    res.status(500).json({ error: 'Ошибка при получении информации о пользователе' });
  }
});

export default router; 