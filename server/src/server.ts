import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import articlesRouter from './routes/articles';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Базовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.json({ message: 'API Тюменского научного журнала работает' });
});

// Использование маршрутов
app.use('/api/articles', articlesRouter);
app.use('/api/auth', authRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});