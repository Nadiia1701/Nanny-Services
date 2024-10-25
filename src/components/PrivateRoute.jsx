import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';

export default function PrivateRoute({ component: Component, redirectTo }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
}
