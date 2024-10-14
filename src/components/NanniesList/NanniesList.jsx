import Nanny from '../Nanny/Nanny';
import Loader from '../Loader/Loader';
import css from './NanniesList.module.css';
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, query, limitToFirst } from 'firebase/database';
import { app } from '../../utils/firebase';

const database = getDatabase(app);
const ITEMS_PER_PAGE = 3;

export default function NanniesList({ selectedFilter }) {
  const [nannies, setNannies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filteredNannies, setFilteredNannies] = useState([]);

  const fetchNannies = async page => {
    setLoading(true);
    const nanniesRef = ref(database, '/');
    const snapshot = await get(
      query(nanniesRef, limitToFirst(page * ITEMS_PER_PAGE))
    );

    if (snapshot.exists()) {
      const data = snapshot.val();
      const nanniesArray = Object.values(data).map(nanny => ({
        ...nanny,
        id: nanny.name, // or a unique property
      }));

      setNannies(prevNannies => [
        ...prevNannies,
        ...nanniesArray.slice(prevNannies.length),
      ]);

      if (nanniesArray.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNannies(currentPage).catch(console.error);
  }, [currentPage]);

  useEffect(() => {
    let filtered = [...nannies];

    // Фильтрация и сортировка в зависимости от выбранного фильтра
    switch (selectedFilter) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_less_than_10':
        filtered = filtered.filter(nanny => nanny.price_per_hour < 10);
        break;
      case 'price_greater_than_10':
        filtered = filtered.filter(nanny => nanny.price_per_hour >= 10);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating); // Сортировка от высокого рейтинга к низкому
        break;
      case 'not_popular':
        filtered.sort((a, b) => a.rating - b.rating); // Сортировка от низкого рейтинга к высокому
        break;
      default:
        break;
    }

    setFilteredNannies(filtered);
  }, [nannies, selectedFilter]);

  const loadMoreNannies = () => {
    if (hasMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : filteredNannies.length === 0 ? (
        <div className={css.text}>
          No teachers match your filter criteria. Please adjust your filters.
        </div>
      ) : (
        <>
          {filteredNannies.map(nanny => (
            <Nanny key={nanny.id} item={nanny} />
          ))}

          {hasMore && (
            <div className={css.btnContainer}>
              <button
                className={css.loadMoreBtn}
                onClick={loadMoreNannies}
                disabled={loading}
              >
                {loading ? <Loader /> : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
