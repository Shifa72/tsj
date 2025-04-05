import * as React from 'react';
import './Issue.css'; // Подключение стилей

// Объединенный список выпусков и статей
const issuesWithArticles = [
  {
    id: 1,
    name: 'Выпуск №1',
    image: 'public/issue1-24.jpg',
    articles: [
      { title: 'ОБЕСПЕЧЕНИЕ НАЦИОНАЛЬНОЙ БЕЗОПАСНОСТИ РФ ЧЕРЕЗ УПРАВЛЕНИЕ ПОДГОТОВКОЙ СПЕЦИАЛИСТОВ ДЛЯ ОБЪЕКТОВ ТРУБОПРОВОДНОГО ТРАНСПОРТА НЕФТИ И ГАЗА', author: 'Е.Л.ЧИЖЕВСКАЯ, С.М.МООР, М.Ю.ЗЕМЕНКОВА, Ю.Д.ЗЕМЕНКОВ', format: 'исследовательская статья' },
      { title: 'ИНТЕЛЛЕКТУАЛЬНЫЕ ГРАФОВЫЕ СИСТЕМЫ ДЛЯ РЕШЕНИЯ ЗАДАЧ ОБЕСПЕЧЕНИЯ ЭФФЕКТИВНОСТИ И БЕЗОПАСНОСТИ ПРОЦЕССОВ ТРАНСПОРТА И ХРАНЕНИЯ УГЛЕВОДОРОДОВ', author: 'Чижевская Е.Л. Земенкова М.Ю. Подорожников С.Ю. Спасибов В.М.', format: 'исследовательская статья' },
      { title: 'ОПТИМИЗАЦИЯ РЕШЕНИЙ ПО УПРАВЛЕНИЮ ТРАНСПОРТНЫМИ ПОТОКАМИ ТРУБОПРОВОДНОГО ТРАНСПОРТА С УЧЕТОМ КРИТЕРИЕВ БЕЗОПАСНОСТИ', author: 'Обухова А.М. Чижевская Е.Л. Халин А.Н. Земенкова М.Ю.', format: 'исследовательская статья' }
    ]
  },
  {
    id: 2,
    name: 'Выпуск №2',
    image: 'public/issue2-24.jpg',
    articles: [
      { title: 'СКВОЗНЫЕ ЦИФРОВЫЕ ТЕХНОЛОГИИ ДЛЯ ОБЕСПЕЧЕНИЯ НАДЕЖНОСТИ И БЕЗОПАСНОСТИ СИСТЕМ МАГИСТРАЛЬНОГО ТРАНСПОРТА ГАЗА', author: 'Н.А.Лучкин, M.Ю.Земенкова, И.Н.Квасов', format: 'исследовательская статья' },
      { title: 'КОМПЛЕКСНЫЙ АНАЛИЗ МЕТОДОВ ПОВЫШЕНИЯ ЭФФЕКТИВНОСТИ ОБРАБОТКИ НА СТАНКАХ С ЧПУ', author: 'Р.Ю.Некрасов, В.Е.Овсянников', format: 'исследовательская статья' },
      { title: 'ПРЕДИКТИВНОЕ УПРАВЛЕНИЕ БЕЗОПАСНОСТЬЮ ОБЪЕКТОВ НЕФТЕГАЗОВОГО КОМПЛЕКСА С ПРИМЕНЕНИЕМ ТЕХНОЛОГИЙ БЕСПИЛОТНЫХ ЛЕТАТЕЛЬНЫХ АППАРАТОВ ПРИ УГРОЗАХ ЧРЕЗВЫЧАЙНЫХ СИТУАЦИЙ', author: 'Е.Л.Чижевская, М.Ю.Земенкова, Н.А.Ческидова, Э.В.Федосеев, Ю.Д.Земенков', format: 'исследовательская статья' }
    ]
  },
  {
    id: 3,
    name: 'Выпуск №3',
    image: 'public/issue3-24.jpg',
    articles: [
      { title: 'МЕТОДЫ ОПТИМИЗАЦИИ ПРИ КОМПЛЕКСНОМ УПРАВЛЕНИИ ПРОЦЕССАМИ В СИСТЕМАХ ТРАНСПОРТА НЕФТИ И ГАЗА', author: 'Е.Л.ЧИЖЕВСКАЯ, А.Д.ВЫДРЕНКОВ, А.Н.ХАЛИН, Ю.Д.ЗЕМЕНКОВ', format: 'исследовательская статья' },
      { title: 'АППРОКСИМАЦИЯ ГАЗОДИНАМИЧЕСКИХ ХАРАКТЕРИСТИК НА ПРИМЕРЕ ЦЕНТРОБЕЖНОГО НАГНЕТАТЕЛЯ 6V-3 ГПА-12-01 «УРАЛ»', author: 'К.С.ВОРОНИН, Б.У.МУХАМАДЕЕВ, А.Н.НАЗАРОВА', format: 'исследовательская статья' },
      { title: 'ИМИТАЦИОННОЕ МОДЕЛИРОВАНИЕ МНОГОСЛОЙНЫХ ОБОЛОЧЕК ТРУБОПРОВОДОВ В РАЙОНАХ С МНОГОЛЕТНЕМЁРЗЛЫМИ ГРУНТАМИ', author: 'В.В.ГОЛИК, И.В.СЕРОШТАНОВ, М.Ю.ЗЕМЕНКОВА, А.А.ГЛАДЕНКО', format: 'экспериментальная статья' }
    ]
  }
];

export const Issue = () => {
  // Хранилище текущего номера выпуска
  const [currentIssueId, setCurrentIssueId] = React.useState<number>(1);

  const handleChangeIssue = (id: number) => {
    setCurrentIssueId(id);
  };

  // Получаем текущий выпуск
  const currentIssue = issuesWithArticles.find(issue => issue.id === currentIssueId) || null;

  return (
    <div className="Issue-container">
      <div className='journal-container'>
        <div className="img-journal">
          <img 
            src={currentIssue?.image ?? ''} 
            alt=""
          />
        </div>
        <div className="articles-container">
          {currentIssue?.articles.map((article, index) => (
            <div className="article-card" key={article.title}> {/* Использование уникального ключа */}
              <span> {article.format} </span>
              <span> {article.author} </span>  
              <h4> {article.title}</h4>
            </div>
          ))}
          <div>
            <button className='Issue-button1'>Читать</button>
          </div>
          
        </div>
      </div>
      {/* Контейнер для выбора выпуска */}
      <div className="issues-select">
        {issuesWithArticles.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => handleChangeIssue(id)}
            className={`issue-button ${currentIssueId === id ? 'active' : ''}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Issue;