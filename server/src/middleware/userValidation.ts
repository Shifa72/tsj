import { Request, Response, NextFunction } from 'express';

// Валидация данных при регистрации
export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;

  // Проверка обязательных полей
  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Отсутствуют обязательные поля',
      details: {
        email: !email ? 'Email обязателен' : null,
        password: !password ? 'Пароль обязателен' : null,
        name: !name ? 'Имя обязательно' : null
      }
    });
  }

  // Проверка формата email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Некорректный формат email',
      details: 'Введите корректный email адрес'
    });
  }

  // Проверка длины пароля
  if (password.length < 6) {
    return res.status(400).json({
      error: 'Некорректная длина пароля',
      details: 'Пароль должен быть не менее 6 символов'
    });
  }

  // Проверка длины имени
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      error: 'Некорректная длина имени',
      details: 'Имя должно быть от 2 до 50 символов'
    });
  }

  next();
};

// Валидация данных при входе
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Проверка обязательных полей
  if (!email || !password) {
    return res.status(400).json({
      error: 'Отсутствуют обязательные поля',
      details: {
        email: !email ? 'Email обязателен' : null,
        password: !password ? 'Пароль обязателен' : null
      }
    });
  }

  // Проверка формата email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Некорректный формат email',
      details: 'Введите корректный email адрес'
    });
  }

  next();
}; 