import css from './NanniesPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NanniesList from '../../components/NanniesList/NanniesList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { fetchNannies } from '../../redux/nannies/operations';
import {
  selectError,
  selectIsLoading,
  selectNannies,
  selectHasNextPage,
  selectLastKey,
} from '../../redux/nannies/selectors';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import { selectSortBy } from '../../redux/filter/selectors'; // импортируем селектор

export default function NanniesPage() {
  const dispatch = useDispatch();
  const lastKey = useSelector(selectLastKey);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const nannies = useSelector(selectNannies);
  const hasNextPage = useSelector(selectHasNextPage);
  const limit = 3;
  const filter = useSelector(selectSortBy); // получение текущего значения фильтра

  useEffect(() => {
    if (nannies.length === 0) {
      dispatch(fetchNannies({ lastKey: null, limit, filter }));
    }
    console.log('Fetched Nannies:', nannies); // Добавьте это логирование
  }, [dispatch, nannies, lastKey, hasNextPage, limit, filter]);

  const loadMoreNannies = () => {
    if (hasNextPage && !isLoading) {
      dispatch(fetchNannies({ lastKey: lastKey || null, limit, filter })); // Убедитесь, что lastKey передается корректно
    }
  };

  return (
    <div>
      {error && <ErrorMessage />}
      <FilterDropdown />
      {nannies.length > 0 && <NanniesList />}
      <div className={css.btnContainer}>
        {hasNextPage && (
          <button
            className={css.loadMoreBtn}
            onClick={loadMoreNannies}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader width="20" height="20" color="var(--white)" />
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
