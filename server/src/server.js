const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const articlesRouter = require('./routes/articles');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Базовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.json({ message: 'API Тюменского научного журнала работает' });
});

// Использование маршрутов аутентификации
app.use('/api/auth', authRouter);

// Использование маршрутов статей
app.use('/api/articles', articlesRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
}); 