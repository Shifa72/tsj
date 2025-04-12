import { Request, Response, NextFunction } from 'express';

// Интерфейс для валидации статьи
interface ArticleValidation {
  title: string;
  abstract: string;
  content: string;
  categoryId: string;
  authorIds: string[];
  keywords?: string[];
}

// Валидация создания/обновления статьи
export const validateArticle = (req: Request, res: Response, next: NextFunction) => {
  const { title, abstract, content, categoryId, authorIds, keywords } = req.body;

  // Проверка обязательных полей
  if (!title || !abstract || !content || !categoryId || !authorIds) {
    return res.status(400).json({
      error: 'Отсутствуют обязательные поля',
      details: {
        title: !title ? 'Заголовок обязателен' : null,
        abstract: !abstract ? 'Аннотация обязательна' : null,
        content: !content ? 'Содержание обязательно' : null,
        categoryId: !categoryId ? 'Категория обязательна' : null,
        authorIds: !authorIds ? 'Авторы обязательны' : null
      }
    });
  }

  // Проверка длины полей
  if (title.length < 3 || title.length > 200) {
    return res.status(400).json({
      error: 'Некорректная длина заголовка',
      details: 'Заголовок должен быть от 3 до 200 символов'
    });
  }

  if (abstract.length < 10 || abstract.length > 500) {
    return res.status(400).json({
      error: 'Некорректная длина аннотации',
      details: 'Аннотация должна быть от 10 до 500 символов'
    });
  }

  if (content.length < 50) {
    return res.status(400).json({
      error: 'Некорректная длина содержания',
      details: 'Содержание должно быть не менее 50 символов'
    });
  }

  // Проверка формата ID
  if (!/^[a-zA-Z0-9-]+$/.test(categoryId)) {
    return res.status(400).json({
      error: 'Некорректный формат ID категории',
      details: 'ID категории должен содержать только буквы, цифры и дефис'
    });
  }

  // Проверка массива авторов
  if (!Array.isArray(authorIds) || authorIds.length === 0) {
    return res.status(400).json({
      error: 'Некорректный формат авторов',
      details: 'Необходимо указать хотя бы одного автора'
    });
  }

  // Проверка формата ID авторов
  for (const authorId of authorIds) {
    if (!/^[a-zA-Z0-9-]+$/.test(authorId)) {
      return res.status(400).json({
        error: 'Некорректный формат ID автора',
        details: 'ID автора должен содержать только буквы, цифры и дефис'
      });
    }
  }

  // Проверка ключевых слов, если они есть
  if (keywords && !Array.isArray(keywords)) {
    return res.status(400).json({
      error: 'Некорректный формат ключевых слов',
      details: 'Ключевые слова должны быть массивом'
    });
  }

  next();
};

// Валидация ID статьи
export const validateArticleId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || !/^[a-zA-Z0-9-]+$/.test(id)) {
    return res.status(400).json({
      error: 'Некорректный формат ID статьи',
      details: 'ID статьи должен содержать только буквы, цифры и дефис'
    });
  }

  next();
}; 