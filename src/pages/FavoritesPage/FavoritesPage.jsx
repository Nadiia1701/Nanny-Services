import { useFavorites } from '../../components/FavoritesContext';
import Nanny from '../../components/Nanny/Nanny';
import { useState } from 'react';
import css from './FavoritesPage.module.css'; // Assuming you have some CSS styles for this component

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [selectedFilter, setSelectedFilter] = useState('');

  // Function to filter favorites based on the selected filter
  const filteredFavorites = () => {
    let filtered = [...favorites]; // Create a shallow copy of the favorites array

    switch (selectedFilter) {
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'price_less_than_10':
        return filtered.filter(nanny => nanny.price_per_hour < 10);
      case 'price_greater_than_10':
        return filtered.filter(nanny => nanny.price_per_hour > 10);
      case 'popular':
        return filtered.sort((a, b) => b.rating - a.rating); // Sort from high to low rating
      case 'not_popular':
        return filtered.sort((a, b) => a.rating - b.rating); // Sort from low to high rating
      default:
        return filtered; // Show all
    }
  };

  return (
    <div>
      <div className={css.filterDropdown}>
        <label htmlFor="filterSelect" className={css.filterLabel}>
          Filters
        </label>
        <select
          id="filterSelect"
          className={css.filterSelect}
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
          <option value="" className={css.option}>
            Show all
          </option>
        </select>
      </div>

      {filteredFavorites().length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        filteredFavorites().map(nanny => <Nanny key={nanny.id} item={nanny} />)
      )}
    </div>
  );
}
