import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../redux/filter/slice';
import { selectSortBy } from '../../redux/filter/selectors';
import { fetchNannies } from '../../redux/nannies/operations';

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSortBy);

  const handleFilterChange = event => {
    dispatch(setSortBy(event.target.value));
    dispatch(fetchNannies({ lastKey: null, limit: 3 })); // Обновляем данные при изменении фильтра
  };

  return (
    <div>
      <label>Filters</label>
      <select value={sortBy} onChange={handleFilterChange}>
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
        <option value="Less than 10$">Less than 10$</option>
        <option value="Greater than 10$">Greater than 10$</option>
        <option value="Popular">Popular</option>
        <option value="Not popular">Not popular</option>
        <option value="Show all">Show all</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
