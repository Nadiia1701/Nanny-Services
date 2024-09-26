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
  return (
    <div className={containerClass}>
      <AppBar className={containerClass} />
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
