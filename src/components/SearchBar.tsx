import React, { FC } from 'react';
import './SearchBar.css';

// Интерфейс Props остается таким же
interface Props {
  onSubmit: (query: string) => void; // Функция обратного вызова для передачи строки запроса
  isSearchOpen: boolean; // Внешнее состояние видимости окна поиска
  toggleSearch: () => void; // Функция для переключения состояния поиска
}

const SearchBar: FC<Props> = ({ onSubmit, isSearchOpen, toggleSearch }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    onSubmit(query);
  };

  return (
    <div className="search-bar">
      <button className="search-icon" onClick={toggleSearch}>
        <i className="fa-solid fa-magnifying-glass" />
      </button>
      {isSearchOpen && (
        <div className="search-dropdown">
          <form className='form-search' onSubmit={handleSubmit}>
            <input
              type="text"
              id="query"
              name="query"
              placeholder="Введите ключевое слово, автора, DOI или что-то еще..."
            />
            <button className="search-button" type="submit">
              Поиск
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchBar;