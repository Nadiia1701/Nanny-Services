import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Loader from './Loader/Loader.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from './PrivateRoute.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';

const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const NanniesPage = lazy(() => import('../pages/NanniesPage/NanniesPage.jsx'));
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage/FavoritesPage.jsx')
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user, please wait...</p>
  ) : (
    <Layout>
      <Suspense
        fallback={
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Loader width="100" height="100" color="var(--Rating)" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={<PrivateRoute component={FavoritesPage} redirectTo="/" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
