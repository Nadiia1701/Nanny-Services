import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../utils/firebase'; // убедитесь, что путь к auth корректный

export default function PrivateRoute({ component: Component, redirectTo }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null для начального состояния (до проверки)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Если пользователь существует, значит он залогинен
    });

    return () => unsubscribe(); // Отписка от слушателя при размонтировании
  }, []);

  // Пока состояние авторизации загружается, можно показать индикатор загрузки
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
}
