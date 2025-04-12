import './BurgerButton.css'; // Подключаем стили для кнопки

interface Props {
  onClick: () => void; // Функция переключения состояния
  isOpen: boolean; // Добавляем новое свойство для состояния кнопки
}

const BurgerButton = ({ onClick, isOpen }: Props) => {
  return (
    <button className={`burger-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span className='burger-span' />
      <span className='burger-span' />
      <span className='burger-span' />
    </button>
  );
};

export default BurgerButton;
