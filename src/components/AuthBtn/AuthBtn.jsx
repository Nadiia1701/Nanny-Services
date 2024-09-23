import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { register } from '../../redux/auth/operations';
import css from './AuthBtn.module.css';

export default function AuthBtn() {
  const dispatch = useDispatch();

  const handleLogIn = () => {
    dispatch(logIn());
  };

  const handleRegister = () => {
    dispatch(register());
  };

  return (
    <div>
      <button className={css.button} type="button" onClick={handleLogIn}>
        Log In
      </button>
      <button className={css.button} type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
