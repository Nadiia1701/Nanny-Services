import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { FiUser } from 'react-icons/fi';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.wrapper}>
      <FiUser size={24} />
      {/* <p className={css.username}>{user.name}</p> */}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
