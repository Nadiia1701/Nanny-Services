import css from './NanniesPage.module.css';
import { useState, useEffect } from 'react';
import NanniesList from '../../components/NanniesList/NanniesList';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export default function NanniesPage() {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        localStorage.removeItem('favorites');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setSelectedFilter('');
    }
  }, [isLoggedIn]);

  return (
    <div className={css.container}>
      <div className={css.filterDropdown}>
        <label htmlFor="filterSelect">Filters</label>
        <select
          id="filterSelect"
          className={css.filterDropdownSelect}
          value={selectedFilter}
          onChange={e => setSelectedFilter(e.target.value)}
        >
          <option value="name-asc" className={css.option}>
            A to Z
          </option>
          <option value="name-desc" className={css.option}>
            Z to A
          </option>
          <option value="price_less_than_10" className={css.option}>
            Less than $10
          </option>
          <option value="price_greater_than_10" className={css.option}>
            Greater than $10
          </option>
          <option value="popular" className={css.option}>
            Popular
          </option>
          <option value="not_popular" className={css.option}>
            Not popular
          </option>
          <option value="">Show all</option>
        </select>
      </div>
      <NanniesList selectedFilter={selectedFilter} />
    </div>
  );
}
