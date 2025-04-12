const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

// Путь к файлу с пользователями
const usersFilePath = path.join(__dirname, '../data/users.json');

// Маршрут для входа
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Чтение файла с пользователями
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    // Поиск пользователя
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Создание JWT токена
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Маршрут для регистрации нового администратора
router.post('/register-admin', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Валидация входных данных
    if (!email || !password || !name) {
      return res.status(400).json({
        message: 'Все поля обязательны для заполнения',
        received: { email: !!email, password: !!password, name: !!name }
      });
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Неверный формат email' });
    }

    // Проверка длины пароля
    if (password.length < 6) {
      return res.status(400).json({ message: 'Пароль должен содержать минимум 6 символов' });
    }

    console.log('Попытка регистрации администратора:', { email, name });

    // Чтение существующих пользователей
    const usersData = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    // Проверка, существует ли пользователь с таким email
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового администратора
    const newAdmin = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      name,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Добавление нового администратора в массив пользователей
    users.push(newAdmin);

    // Сохранение обновленного списка пользователей
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    console.log('Администратор успешно создан:', { email, name });

    res.status(201).json({
      message: 'Администратор успешно создан',
      user: {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role
      }
    });
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message
    });
  }
});

module.exports = router; 