import React, { useState } from 'react';
import './header.css'; // Подключаем стили
import SearchBar from './SearchBar'; // Подключаем компонент поиска
import BurgerButton from './BurgerButton'; // Подключаем компонент бургера
import Menu from './Menu'; // Подключаем компонент меню

// Определяем функцию обработки отправки формы
const handleSubmit = (query: string) => { // Указали явный тип параметра query
  // Логика перенаправления на страницу поиска
  window.location.href = `/search?q=${encodeURIComponent(query)}`;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Управление состоянием открытия меню
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Новое состояние для поиска

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Переключаем состояние
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Переключаем состояние поиска
  };

  // Функция для перенаправления на главную страницу
  const goToHomePage = () => {
    window.location.href = '/'; // Здесь указывается путь до главной страницы вашего приложения
  };

  return (
    <header className="header">
      <div className={`overlay ${isOpen ? 'active' : ''}`}></div>
      <div className="header-text">
        {/* Добавляем обработчик события onClick */}
        <h3 onClick={goToHomePage}>Тюменский Научный журнал</h3>
        <ul>
          <li>Выпуск 3</li>
          <li>Номер 3</li>
          <li>ноябрь 2024</li>
        </ul>
        <SearchBar onSubmit={handleSubmit} isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
        <BurgerButton onClick={toggleMenu} isOpen={isOpen} />
        <Menu isOpen={isOpen} />
      </div>
    </header>
  );
};

export default Header;
