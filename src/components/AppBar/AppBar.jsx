import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthBtn from '../AuthBtn/AuthBtn';
import Logo from '../Logo/Logo';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './AppBar.module.css';

export default function AppBar({ navClass }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={`${css.header} ${navClass}`}>
      <Logo />
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthBtn />}
    </header>
  );
}
