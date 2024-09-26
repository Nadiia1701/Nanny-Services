import css from './Logo.module.css';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link className={css.logo} to="/">
      <span>Nanny.Services</span>
    </Link>
  );
}
