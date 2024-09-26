import css from './AuthBtn.module.css';
import LogInBtn from '../LogInBtn/LogInBtn';
import RegistrationBtn from '../RegistrationBtn/RegistrationBtn';

export default function AuthBtn() {
  return (
    <div className={css.container}>
      <LogInBtn />
      <RegistrationBtn />
    </div>
  );
}
