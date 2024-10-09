import { useSelector, useDispatch } from 'react-redux';
import { selectSortBy } from '../../redux/filter/selectors';
import { setSortBy } from '../../redux/filter/slice';
import css from './FilterDropdown.module.css';

const FilterDropdown = () => {
  const dispatch = useDispatch();
  const currentSort = useSelector(selectSortBy);

  const options = [
    { value: 'name-asc', label: 'A to Z' },
    { value: 'name-desc', label: 'Z to A' },
    { value: 'price_less_than_10', label: 'Less than 10$' },
    { value: 'price_greater_than_10', label: 'Greater than 10$' },
    { value: 'popular', label: 'Popular' },
    { value: 'not_popular', label: 'Not popular' },
    { value: 'show-all', label: 'Show all' },
  ];

  const handleChange = event => {
    const selectedValue = event.target.value;
    dispatch(setSortBy(selectedValue)); // Отправляем выбранное значение фильтра в Redux
  };

  return (
    <div className={css.filterDropdown}>
      <label htmlFor="filter-select">Filters</label>
      <select
        id="filter-select"
        value={currentSort}
        onChange={handleChange}
        className={css.filterDropdownSelect}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
