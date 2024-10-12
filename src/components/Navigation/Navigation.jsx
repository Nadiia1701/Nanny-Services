import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase'; // Убедитесь, что путь к auth корректный
import css from './Navigation.module.css';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Устанавливаем true, если пользователь существует
    });

    return () => unsubscribe(); // Отписка при размонтировании
  }, []);

  return (
    <nav className={css.container}>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      <NavLink className={css.link} to="/nannies">
        Nannies
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/favorites">
          Favorites
        </NavLink>
      )}
    </nav>
  );
}
