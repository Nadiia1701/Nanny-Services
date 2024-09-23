import css from './HomePage.module.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Make Life Easier for the Family:</h1>
      <p className={css.text}>Find Babysitters Online for All Occasions</p>
      <Link className={css.navBtn} to="/nannies">
        Get started
      </Link>
    </div>
  );
}
