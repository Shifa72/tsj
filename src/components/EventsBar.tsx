import React from 'react';
import './EventsBar.css'; // Подключаем наш собственный файл стилей

interface Event {
  date: string;
  topic: string;
  format: 'online' | 'offline';
}

const eventsData: Event[] = [
  {
    date: '01 октября',
    topic: 'Семинар НУГ «БРИКС+»',
    format: 'online'
  },
  {
    date: '24 марта',
    topic: 'Семинар НУГ «БРИКС+ как площадка для сотрудничества в Арктике»: «Арктическая политика администрации Трампа: предварительные итоги и значение для России и неарктических стран»',
    format: 'online'
  }
];

const EventsBar: React.FC = () => {
  return (
    <div className="events-bar">
      <h3 className="section-events-title">Мероприятия</h3>
      {eventsData.map((event, index) => (
        <div className="event-card" key={index}>
          <div className="header-row">
            <p className="date">{event.date}</p>
            <p className="topic">{event.topic}</p>
          </div>
          <span className={`format ${event.format}`}>{event.format.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
};

export default EventsBar;
