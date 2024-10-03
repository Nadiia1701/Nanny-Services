import Nanny from '../Nanny/Nanny';
import css from './NanniesList.module.css';
import { useSelector } from 'react-redux';
import { selectNannies } from '../../redux/nannies/selectors';

export default function TrucksList() {
  const items = useSelector(selectNannies);

  return (
    <ul className={css.container}>
      {items.map((item, index) => (
        <li key={`${item.id}-${index}`}>
          <Nanny item={item} />
        </li>
      ))}
    </ul>
  );
}
