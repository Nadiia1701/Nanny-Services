import css from './Nanny.module.css';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai'; // Рейтинг
import { FaMapLocationDot } from 'react-icons/fa6'; // Локация
import { FaRegHeart } from 'react-icons/fa'; // Сердечко
import NannyReviews from '../NannyReviews/NannyReviews';
import MakeAnAppointmentBtn from '../MakeAnAppointmentBtn/MakeAnAppointmentBtn'; // Компонент для модального окна с формой

export default function Nanny({
  item: {
    name,
    price_per_hour,
    rating,
    location,
    kids_age,
    about,
    birthday,
    characters,
    education,
    experience,
    avatar_url,
    reviews,
  },
}) {
  const [showFullReviews, setShowFullReviews] = useState(false);
  const toggleReviews = () => {
    setShowFullReviews(!showFullReviews);
  };
  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className={css.container}>
      <div className={css.card}>
        <div className={css.imageFrame}>
          <img src={avatar_url} alt={name} className={css.image} />
        </div>

        <div className={css.details}>
          <div className={css.hatContainer}>
            <div className={css.nameContainer}>
              <span className={css.nanny}>Nanny</span>
              <h2 className={css.name}>{name}</h2>
            </div>

            <div className={css.infoContainer}>
              <div className={css.infoWrapper}>
                <span className={css.location}>
                  <FaMapLocationDot className={css.locationIcon} />
                  {location}
                </span>
                <span className={css.rating}>
                  <AiFillStar className={css.starIcon} />
                  <p>Rating: {rating}</p>
                </span>
                <p className={css.price}>
                  Price / 1 hour:{' '}
                  <span className={css.valuePrice}>
                    {price_per_hour.toFixed(0)}$
                  </span>
                </p>
              </div>
              <FaRegHeart className={css.heartIcon} />
            </div>
          </div>

          <div className={css.features}>
            <div className={css.feature}>
              <span className={css.featureName}>Age: </span>
              <span className={css.featureValueAge}>
                {calculateAge(birthday)}
              </span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Experience: </span>
              <span className={css.featureValue}>{experience}</span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Kids Age: </span>
              <span className={css.featureValue}>{kids_age}</span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Characters: </span>
              <span className={css.featureValue}>
                {characters.join(', ')}
              </span>{' '}
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Education: </span>
              <span className={css.featureValue}>{education}</span>
            </div>
          </div>

          <p className={css.description}>{about}</p>

          <div className={css.reviews}>
            {showFullReviews && <NannyReviews reviews={reviews} />}
            {showFullReviews ? (
              <MakeAnAppointmentBtn />
            ) : (
              <button onClick={toggleReviews} className={css.readMoreBtn}>
                Read more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
