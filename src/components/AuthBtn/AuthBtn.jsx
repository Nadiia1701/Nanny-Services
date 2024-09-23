import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './AuthBtn.module.css';
import LogInBtn from '../LogInBtn/LogInBtn';

export default function AuthBtn() {
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(register());
  };

  return (
    <div>
      <LogInBtn />
      <button className={css.button} type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
