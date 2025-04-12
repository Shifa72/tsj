import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminArticles.css';

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

const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/articles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении статьи');
      }

      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при удалении');
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-articles-container">
      <div className="admin-articles-header">
        <h1>Управление статьями</h1>
        <Link to="/admin/articles/new" className="create-article-button">
          Создать статью
        </Link>
      </div>

      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <div className="article-info">
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
              <div className="article-meta">
                <span>Статус: {article.status}</span>
                <span>Категория: {article.category.name}</span>
                <span>Автор: {article.authors[0]?.name}</span>
              </div>
            </div>
            <div className="article-actions">
              <Link to={`/admin/articles/${article.id}/edit`} className="edit-button">
                Редактировать
              </Link>
              <button
                onClick={() => handleDelete(article.id)}
                className="delete-button"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticles; 