import css from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className={css.container}>
      <div className={css.textContainer}>
        <h1 className={css.title}>Make Life Easier for the Family:</h1>
        <p className={css.text}>Find Babysitters Online for All Occasions</p>
      </div>
      <Link className={css.navBtn} to="/nannies">
        <span className={css.btnText}>Get started</span>{' '}
        <FiArrowUpRight size={20} />
      </Link>
    </div>
  );
}
