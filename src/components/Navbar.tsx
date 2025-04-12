import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthorsDropdown, setShowAuthorsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-brand">
        <img 
          src="/tsj-logo.png" 
          alt="ТЮМЕНСКИЙ НАУЧНЫЙ ЖУРНАЛ" 
          className="navbar-brand-logo"
        />
        <div className="navbar-brand-text">
          <span className="navbar-brand-title">ТЮМЕНСКИЙ НАУЧНЫЙ ЖУРНАЛ</span>
          <span className="navbar-brand-subtitle"> </span>
        </div>
      </Link>
      <div className="navbar-menu">
        <Link to="/issues" className="navbar-item">
          Выпуски
        </Link>
        <div className="navbar-dropdown">
          <div className="dropdown-toggle">
            <Link to="/editorial-board" className="navbar-item">
              Редакция
            </Link>
          </div>
          <div className="dropdown-menu">
            <Link to="/international-council" className="dropdown-item">
              Международный совет
            </Link>
            <Link to="/editorial-council" className="dropdown-item">
              Редакционный совет
            </Link>
            <Link to="/editorial-board" className="dropdown-item">
              Редакционная коллегия
            </Link>
          </div>
        </div>
        <Link to="/PublishingEthics" className="navbar-item">
              Этика
        </Link>
        <div className="navbar-dropdown">
          <div className="dropdown-toggle">
            <Link to="/authors" className="navbar-item">
              Авторам
            </Link>
          </div>
          <div className="dropdown-menu">
            <Link to="/authors" className="dropdown-item">
              Правила оформления
            </Link>
            <Link to="/review" className="dropdown-item">
              Рецензирование
            </Link>
          </div>
        </div>
        <div className="navbar-dropdown">
          <div className="dropdown-toggle">
            <Link to="/about" className="navbar-item">
              О журнале
            </Link>
          </div>
          <div className="dropdown-menu">
            <Link to="/specialties" className="dropdown-item">
              Специальности
            </Link>
            <Link to="/publication-info" className="dropdown-item">
              Сведения об издании
            </Link>
            <Link to="/contact" className="dropdown-item">
              Контакты
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <div className="navbar-user">
            <span className="user-name">{user?.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </div>
        ) : (
          <div className="navbar-auth">
            <Link to="/login" className="login-button">Войти</Link>
            <Link to="/register" className="register-button">Регистрация</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 