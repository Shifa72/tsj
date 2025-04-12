import React, { useState, useEffect } from 'react';
import './Issue.css'; // Подключение стилей

// Объединенный список выпусков и статей
const issuesWithArticles = [
  {
    id: 1,
    name: 'Выпуск №1',
    image: '/tsj/issue1-24.jpg',
    articles: [
      { title: 'ОБЕСПЕЧЕНИЕ НАЦИОНАЛЬНОЙ БЕЗОПАСНОСТИ РФ ЧЕРЕЗ УПРАВЛЕНИЕ ПОДГОТОВКОЙ СПЕЦИАЛИСТОВ ДЛЯ ОБЪЕКТОВ ТРУБОПРОВОДНОГО ТРАНСПОРТА НЕФТИ И ГАЗА', author: 'Е.Л.ЧИЖЕВСКАЯ, С.М.МООР, М.Ю.ЗЕМЕНКОВА, Ю.Д.ЗЕМЕНКОВ', format: 'исследовательская статья' },
      { title: 'ИНТЕЛЛЕКТУАЛЬНЫЕ ГРАФОВЫЕ СИСТЕМЫ ДЛЯ РЕШЕНИЯ ЗАДАЧ ОБЕСПЕЧЕНИЯ ЭФФЕКТИВНОСТИ И БЕЗОПАСНОСТИ ПРОЦЕССОВ ТРАНСПОРТА И ХРАНЕНИЯ УГЛЕВОДОРОДОВ', author: 'Чижевская Е.Л. Земенкова М.Ю. Подорожников С.Ю. Спасибов В.М.', format: 'исследовательская статья' },
      { title: 'ОПТИМИЗАЦИЯ РЕШЕНИЙ ПО УПРАВЛЕНИЮ ТРАНСПОРТНЫМИ ПОТОКАМИ ТРУБОПРОВОДНОГО ТРАНСПОРТА С УЧЕТОМ КРИТЕРИЕВ БЕЗОПАСНОСТИ', author: 'Обухова А.М. Чижевская Е.Л. Халин А.Н. Земенкова М.Ю.', format: 'исследовательская статья' }
    ]
  },
  {
    id: 2,
    name: 'Выпуск №2',
    image: '/tsj/issue2-24.jpg',
    articles: [
      { title: 'СКВОЗНЫЕ ЦИФРОВЫЕ ТЕХНОЛОГИИ ДЛЯ ОБЕСПЕЧЕНИЯ НАДЕЖНОСТИ И БЕЗОПАСНОСТИ СИСТЕМ МАГИСТРАЛЬНОГО ТРАНСПОРТА ГАЗА', author: 'Н.А.Лучкин, M.Ю.Земенкова, И.Н.Квасов', format: 'исследовательская статья' },
      { title: 'КОМПЛЕКСНЫЙ АНАЛИЗ МЕТОДОВ ПОВЫШЕНИЯ ЭФФЕКТИВНОСТИ ОБРАБОТКИ НА СТАНКАХ С ЧПУ', author: 'Р.Ю.Некрасов, В.Е.Овсянников', format: 'исследовательская статья' },
      { title: 'ПРЕДИКТИВНОЕ УПРАВЛЕНИЕ БЕЗОПАСНОСТЬЮ ОБЪЕКТОВ НЕФТЕГАЗОВОГО КОМПЛЕКСА С ПРИМЕНЕНИЕМ ТЕХНОЛОГИЙ БЕСПИЛОТНЫХ ЛЕТАТЕЛЬНЫХ АППАРАТОВ ПРИ УГРОЗАХ ЧРЕЗВЫЧАЙНЫХ СИТУАЦИЙ', author: 'Е.Л.Чижевская, М.Ю.Земенкова, Н.А.Ческидова, Э.В.Федосеев, Ю.Д.Земенков', format: 'исследовательская статья' }
    ]
  },
  {
    id: 3,
    name: 'Выпуск №3',
    image: '/tsj/issue3-24.jpg',
    articles: [
      { title: 'МЕТОДЫ ОПТИМИЗАЦИИ ПРИ КОМПЛЕКСНОМ УПРАВЛЕНИИ ПРОЦЕССАМИ В СИСТЕМАХ ТРАНСПОРТА НЕФТИ И ГАЗА', author: 'Е.Л.ЧИЖЕВСКАЯ, А.Д.ВЫДРЕНКОВ, А.Н.ХАЛИН, Ю.Д.ЗЕМЕНКОВ', format: 'исследовательская статья' },
      { title: 'АППРОКСИМАЦИЯ ГАЗОДИНАМИЧЕСКИХ ХАРАКТЕРИСТИК НА ПРИМЕРЕ ЦЕНТРОБЕЖНОГО НАГНЕТАТЕЛЯ 6V-3 ГПА-12-01 «УРАЛ»', author: 'К.С.ВОРОНИН, Б.У.МУХАМАДЕЕВ, А.Н.НАЗАРОВА', format: 'исследовательская статья' },
      { title: 'ИМИТАЦИОННОЕ МОДЕЛИРОВАНИЕ МНОГОСЛОЙНЫХ ОБОЛОЧЕК ТРУБОПРОВОДОВ В РАЙОНАХ С МНОГОЛЕТНЕМЁРЗЛЫМИ ГРУНТАМИ', author: 'В.В.ГОЛИК, И.В.СЕРОШТАНОВ, М.Ю.ЗЕМЕНКОВА, А.А.ГЛАДЕНКО', format: 'экспериментальная статья' }
    ]
  }
];

export const Issue = () => {
  const [currentIssueId, setCurrentIssueId] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [previousIssueId, setPreviousIssueId] = useState<number>(1);

  useEffect(() => {
    if (isPaused || isAnimating) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isAnimating]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setPreviousIssueId(currentIssueId);
    setSlideDirection('right');
    setIsAnimating(true);
    setCurrentIssueId((currentId) => {
      const nextId = currentId % issuesWithArticles.length + 1;
      return nextId;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setPreviousIssueId(currentIssueId);
    setSlideDirection('left');
    setIsAnimating(true);
    setCurrentIssueId((currentId) => {
      const newId = currentId === 1 ? issuesWithArticles.length : currentId - 1;
      return newId;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleChangeIssue = (id: number) => {
    if (isAnimating) return;
    setPreviousIssueId(currentIssueId);
    setIsAnimating(true);
    setSlideDirection(id > currentIssueId ? 'right' : 'left');
    setCurrentIssueId(id);
    setIsPaused(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getSlideClass = (id: number) => {
    if (id === currentIssueId) {
      return `active ${slideDirection === 'right' ? 'slide-enter-right' : 'slide-enter-left'}`;
    }
    if (id === previousIssueId) {
      return slideDirection === 'right' ? 'slide-exit-left' : 'slide-exit-right';
    }
    return '';
  };

  const currentIssue = issuesWithArticles.find(issue => issue.id === currentIssueId) || null;

  return (
    <div className="Issue-container">
      <div 
        className='journal-container'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="img-journal">
          {issuesWithArticles.map((issue) => (
            <img 
              key={issue.id}
              src={issue.image} 
              alt={issue.name}
              className={getSlideClass(issue.id)}
              style={{ 
                visibility: issue.id === currentIssueId || issue.id === previousIssueId ? 'visible' : 'hidden'
              }}
            />
          ))}
        </div>
        <div className="issue-articles-container">
          {currentIssue?.articles.map((article) => (
            <div className="issue-article-card" key={article.title}>
              <span>{article.format}</span>
              <span>{article.author}</span>  
              <h4>{article.title}</h4>
            </div>
          ))}
          <div className='Issue-button1'>
            <button>Читать</button>
          </div>
        </div>
      </div>
      {/* Контейнер для выбора выпуска */}
      <div className="issues-select">
        {issuesWithArticles.map(({ id, name, image }) => (
          <img
            key={id}
            src={image}
            alt={name}
            onClick={() => handleChangeIssue(id)}
            className={`issue-image ${currentIssueId === id ? 'active' : ''}`}
          />
        ))}
      </div>  
    </div>
  );
};

export default Issue;