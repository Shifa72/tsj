import React, { FC } from 'react';
import SearchBar from '../components/SearchBar'; // импортируем компонент поиска
import './Home.css'; 
import EventsBar from '../components/EventsBar';
import Issue from '../components/Issue';
import InvitationBlock from '../components/InvitationBlock';
import SpecialtiesPage from './secondary/SpecialtiesPage';


const Home: FC = () => {
  const handleSearchSubmit = (query: string) => {
    // логика перенаправления на страницу поиска
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className='grid-container'>
      <div className='box1'>
      </div>
      <div className='box2'>
        <Issue />
      </div>
      <div className='box3'>
        <InvitationBlock />
      </div>
      <div className='box4'>
        <p>box4</p>
      </div>
      <div className='box5'>
        <p>box5</p>
      </div>
    </div>

    
  );
};

export default Home;
