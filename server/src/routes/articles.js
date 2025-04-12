const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Путь к файлу с данными
const articlesPath = path.join(__dirname, '../data/articles.json');

// Получение списка статей
router.get('/', (req, res) => {
  try {
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    res.json(articles);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({ error: 'Ошибка при получении статей' });
  }
});

// Получение статьи по ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    const article = articles.find(a => a.id === id);

    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    res.json(article);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({ error: 'Ошибка при получении статьи' });
  }
});

module.exports = router; 