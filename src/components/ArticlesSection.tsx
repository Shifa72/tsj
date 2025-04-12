import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArticlesSection.css';

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

const ArticlesSection: React.FC = () => {
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
        // Берем только первые 3 статьи для отображения на главной странице
        setArticles(data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="articles-section-loading">Загрузка...</div>;
  if (error) return <div className="articles-section-error">{error}</div>;

  return (
    <div className="articles-section">
      <h2 className="articles-section-title">Последние статьи</h2>
      <div className="articles-section-list">
        {articles.map((article) => (
          <div key={article.id} className="articles-section-card">
            <h3>{article.title}</h3>
            <p className="articles-section-abstract">{article.abstract}</p>
            <div className="articles-section-meta">
              <p><strong>Авторы:</strong> {article.authors.map(author => author.name).join(', ')}</p>
              <p><strong>Категория:</strong> {article.category.name}</p>
            </div>
            <Link to={`/articles/${article.id}`} className="articles-section-link">
              Подробнее
            </Link>
          </div>
        ))}
      </div>
      <div className="articles-section-more">
        <Link to="/articles" className="articles-section-more-link">
          Все статьи
        </Link>
      </div>
    </div>
  );
};

export default ArticlesSection; 