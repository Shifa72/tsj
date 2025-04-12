import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';

interface Article {
  id: string;
  title: string;
  abstract: string;
  status: string;
  authors: Array<{
    id: string;
    name: string;
  }>;
  category: {
    id: string;
    name: string;
  };
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/articles');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке статей');
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="articles-container">
      <h1>Статьи</h1>
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <h2>{article.title}</h2>
            <p className="article-abstract">{article.abstract}</p>
            <div className="article-meta">
              <p><strong>Автоооры:</strong> {article.authors.map(author => author.name).join(', ')}</p>
              <p><strong>Категория:</strong> {article.category.name}</p>
              <p><strong>Статус:</strong> {article.status}</p>
            </div>
            <Link to={`/articles/${article.id}`} className="article-link">
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles; 