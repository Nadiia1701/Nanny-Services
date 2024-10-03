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

export default function NanniesPage() {
  const dispatch = useDispatch();
  const lastKey = useSelector(selectLastKey);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const nannies = useSelector(selectNannies);
  const hasNextPage = useSelector(selectHasNextPage);
  const limit = 3;

  // Первая загрузка данных
  useEffect(() => {
    console.log('Nannies:', nannies);
    console.log('Last key:', lastKey);
    console.log('Has Next Page:', hasNextPage);

    if (nannies.length === 0) {
      dispatch(fetchNannies({ lastKey: null, limit }));
    }
  }, [dispatch, nannies, lastKey, hasNextPage, limit]); // Обновляем, когда меняются эти зависимости

  const loadMoreNannies = () => {
    if (hasNextPage && !isLoading) {
      dispatch(fetchNannies({ lastKey, limit }));
    }
  };

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && !error && <Loader />}
      {nannies.length > 0 && <NanniesList items={nannies} />}
      {hasNextPage && (
        <button
          className={css.loadMoreBtn}
          onClick={loadMoreNannies}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
