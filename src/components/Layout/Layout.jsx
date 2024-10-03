import { Toaster } from 'react-hot-toast';
import css from './Layout.module.css';
import AppBar from '../AppBar/AppBar';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const containerClass = isHomePage
    ? `${css.container} ${css.homeBackground}`
    : `${css.container} ${css.defaultBackground}`;

  const navClass = isHomePage
    ? `${css.homeBackground}` // Используйте homeBackground для главной страницы
    : `${css.navBackground}`; // navBackground для остальных страниц

  return (
    <div className={containerClass}>
      <AppBar navClass={navClass} />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
