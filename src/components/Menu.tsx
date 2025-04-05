import React from 'react';
import './Menu.css'; // Подключаем стили для меню

interface Props {
  isOpen: boolean; // Состояние открытия меню
}

const Menu = ({ isOpen }: Props) => {
  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`}></div> {/* Затемнение */}
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О нас</a></li>
          <li><a href="/contact">Контакты</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;

