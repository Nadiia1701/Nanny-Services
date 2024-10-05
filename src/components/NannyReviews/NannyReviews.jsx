import { AiFillStar } from 'react-icons/ai';
import css from './NannyReviews.module.css';

export default function NannyReviews({ reviews }) {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {reviews
          ? reviews.map((review, index) => (
              <div key={index} className={css.wrapper}>
                <div className={css.nameContainer}>
                  <p className={css.avatar}>
                    {review.reviewer.charAt(0).toUpperCase()}
                  </p>
                  <div className={css.nameStar}>
                    <p className={css.name}>{review.reviewer}</p>
                    <div className={css.starRating}>
                      <AiFillStar className={css.starIcon} />
                      <span className={css.rating}>
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={css.commentWrapper}>
                  <p className={css.comment}>{review.comment}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
