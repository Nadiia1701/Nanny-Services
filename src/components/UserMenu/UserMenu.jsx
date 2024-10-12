import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase'; // Убедитесь, что путь к auth корректный
import { FiUser } from 'react-icons/fi';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser); // Устанавливаем текущего пользователя, если он залогинен
    });

    return () => unsubscribe(); // Отписка при размонтировании
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className={css.wrapper}>
      <FiUser size={24} />
      {user && <p className={css.username}>{user.displayName}</p>}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
