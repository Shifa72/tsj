import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Интерфейс для декодированного токена
interface DecodedToken {
  userId: string;
  role: string;
}

// Расширяем интерфейс Request для добавления пользователя
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// Middleware для проверки авторизации
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Требуется авторизация',
        details: 'Токен не предоставлен'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Недействительный токен',
      details: 'Токен истек или недействителен'
    });
  }
};

// Middleware для проверки роли администратора
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Требуется авторизация',
        details: 'Токен не предоставлен'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as DecodedToken;
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        error: 'Доступ запрещен',
        details: 'Требуются права администратора'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Недействительный токен',
      details: 'Токен истек или недействителен'
    });
  }
}; 