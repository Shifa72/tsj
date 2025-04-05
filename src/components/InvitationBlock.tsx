import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './InvitationBlock.css'; // Обычный CSS файл

interface Props {}

const InvitationBlock: FC<Props> = () => {
  return (
    <div className="containerInvitation">
      <div className="invitation">
        <h2>Уважаемые исследователи и педагогические работники!</h2>
        <p>Приглашаем Вас опубликовать свои труды на страницах нашего журнала.</p>
        <p>Тюменский научный журнал индексируется в РИНЦ и размещается на платформе eLIBRARY.RU.</p>
        <p>Статьи принимаются до 20 числа каждого месяца, проходят комплексную проверку и рецензирование, присваиваются уникальные коды EDN, DOI.</p>
        <p>Номера выходят четыре раза в год.</p>
      </div>
      <div className="usefulInfo">
        <h2>Полезная информация</h2>
        <ul>
          <li><Link to="/specialties">Рубрики и специальности</Link></li>
          <li><Link to="/authors">Авторам</Link></li>
          <li><Link to="/review">Рецензии и проверка</Link></li>
          <li><Link to="/publishingethics">Издательская этика</Link></li>
          <li><a href="#">Контакты редакции</a></li>
        </ul>
      </div>
    </div>
  );
};

export default InvitationBlock;
