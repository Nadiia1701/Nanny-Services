import { useFavorites } from '../../components/FavoritesContext';
import Nanny from '../../components/Nanny/Nanny';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        favorites.map(nanny => <Nanny key={nanny.id} item={nanny} />)
      )}
    </div>
  );
}
