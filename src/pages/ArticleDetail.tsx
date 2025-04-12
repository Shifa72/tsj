import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArticleDetail.css';

interface Article {
  id: string;
  title: string;
  abstract: string;
  content: string;
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

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/articles/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке статьи');
        }
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div className="error">Статья не найдена</div>;

  return (
    <div className="article-detail-container">
      <Link to="/articles" className="back-link">
        <i className="fas fa-arrow-left"></i> Назад к списку статей
      </Link>
      
      <div className="article-detail">
        <h1>{article.title}</h1>
        
        <div className="article-meta">
          <p><strong>Авторы:</strong> {article.authors.map(author => author.name).join(', ')}</p>
          <p><strong>Категория:</strong> {article.category.name}</p>
          <p><strong>Статус:</strong> {article.status}</p>
        </div>
        
        <div className="article-abstract">
          <h2>Аннотация</h2>
          <p>{article.abstract}</p>
        </div>
        
        <div className="article-content">
          <h2>Содержание</h2>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail; 