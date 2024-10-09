import Nanny from '../Nanny/Nanny';
import css from './NanniesList.module.css';
import { useSelector } from 'react-redux';
import { selectNannies } from '../../redux/nannies/selectors';

export default function NanniesList() {
  const nannies = useSelector(selectNannies);

  return (
    <ul className={css.container}>
      {nannies.map((nanny, index) => (
        <li key={`${nanny.id}-${index}`}>
          <Nanny item={nanny} />
        </li>
      ))}
    </ul>
  );
}
