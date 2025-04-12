import { FC } from 'react';
import '../components/SearchBar'; // импортируем компонент поиска
import './Home.css'; 
import '../components/EventsBar';
import Issue from '../components/Issue';
import InvitationBlock from '../components/InvitationBlock';
import ArticlesSection from '../components/ArticlesSection';
import './secondary/SpecialtiesPage';


const Home: FC = () => {
  /*const handleSearchSubmit = (query: string) => {
    // логика перенаправления на страницу поиска
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };*/

  return (
    <div className='grid-container'>
      <div className='box1'>
        <Issue />
      </div>
      <div className='box2'>
        <InvitationBlock />
      </div>
      <div className='box3'>
        <ArticlesSection />
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
