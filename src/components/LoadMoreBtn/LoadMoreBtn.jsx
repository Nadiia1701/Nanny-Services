import css from './LoadMoreBtn.module.css';

export default function LoadMoreButton({ onClick }) {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onClick}>
        Load more!
      </button>
    </div>
  );
}
