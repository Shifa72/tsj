import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { validateArticle, validateArticleId } from '../middleware/validation';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

// Путь к файлу с данными
const articlesPath = path.join(__dirname, '../data/articles.json');

// Получение списка статей (публичный доступ)
router.get('/', async (req: Request, res: Response) => {
  try {
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    res.json(articles);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({ error: 'Ошибка при получении статей' });
  }
});

// Получение статьи по ID (публичный доступ)
router.get('/:id', validateArticleId, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    const article = articles.find((a: any) => a.id === id);

    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    res.json(article);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({ error: 'Ошибка при получении статьи' });
  }
});

// Создание новой статьи (требуется авторизация администратора)
router.post('/', requireAuth, requireAdmin, validateArticle, async (req: Request, res: Response) => {
  try {
    const { title, abstract, content, categoryId, authorIds, keywords } = req.body;

    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    const newArticle = {
      id: (articles.length + 1).toString(),
      title,
      abstract,
      content,
      categoryId,
      keywords,
      authors: authorIds.map((id: string) => ({ id })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    };

    articles.push(newArticle);
    fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Ошибка при создании статьи:', error);
    res.status(500).json({ error: 'Ошибка при создании статьи' });
  }
});

// Обновление статьи (требуется авторизация администратора)
router.put('/:id', requireAuth, requireAdmin, validateArticleId, validateArticle, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, abstract, content, categoryId, authorIds, keywords, status } = req.body;

    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    const articleIndex = articles.findIndex((a: any) => a.id === id);

    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    const updatedArticle = {
      ...articles[articleIndex],
      title,
      abstract,
      content,
      categoryId,
      keywords,
      status,
      authors: authorIds.map((id: string) => ({ id })),
      updatedAt: new Date().toISOString(),
    };

    articles[articleIndex] = updatedArticle;
    fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

    res.json(updatedArticle);
  } catch (error) {
    console.error('Ошибка при обновлении статьи:', error);
    res.status(500).json({ error: 'Ошибка при обновлении статьи' });
  }
});

// Удаление статьи (требуется авторизация администратора)
router.delete('/:id', requireAuth, requireAdmin, validateArticleId, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    const articleIndex = articles.findIndex((a: any) => a.id === id);

    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    articles.splice(articleIndex, 1);
    fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении статьи:', error);
    res.status(500).json({ error: 'Ошибка при удалении статьи' });
  }
});

export default router;