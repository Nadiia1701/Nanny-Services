import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthBtn from '../AuthBtn/AuthBtn';
import Logo from '../Logo/Logo';
import css from './AppBar.module.css';

export default function AppBar({ navClass }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Слушаем изменения состояния аутентификации пользователя
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // если user существует, значит пользователь залогинен
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => unsubscribe();
  }, []);

  return (
    <header className={`${css.header} ${navClass}`}>
      <Logo />
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthBtn />}
    </header>
  );
}
