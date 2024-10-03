import css from './Nanny.module.css';
import { AiFillStar } from 'react-icons/ai'; // Рейтинг
import { FaMapLocationDot } from 'react-icons/fa6'; // Локация
import { FaRegHeart } from 'react-icons/fa'; // Сердечко

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
  },
}) {
  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Если день рождения в текущем году еще не наступил, уменьшаем возраст на 1
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className={css.card}>
      <img src={avatar_url} alt={name} className={css.image} />

      <div className={css.details}>
        <div className={css.nameContainer}>
          <span className={css.nanny}>Nanny</span>
          <h2 className={css.title}>{name}</h2>
        </div>

        <div className={css.ratingLocation}>
          <span className={css.location}>
            <FaMapLocationDot
              width={20}
              height={20}
              className={css.locationIcon}
            />
            {location}
          </span>
          <span className={css.rating}>
            <AiFillStar width={20} height={20} className={css.starIcon} />
            <p>Rating: {rating}</p>
          </span>
          <p className={css.price}>{price_per_hour.toFixed(0)}$</p>
          <FaRegHeart width={20} height={20} className={css.heartIcon} />
        </div>

        <p className={css.description}>{about}</p>

        <div className={css.features}>
          <div className={css.feature}>
            <span className={css.featureName}>Age: </span>
            <span>{calculateAge(birthday)}</span>
          </div>
          <div className={css.feature}>
            <span className={css.featureName}>Experience: </span>
            <span>{experience}</span>
          </div>
          <div className={css.feature}>
            <span className={css.featureName}>Kids Age: </span>
            <span>{kids_age}</span>
          </div>
          <div className={css.feature}>
            <span className={css.featureName}>Characters: </span>
            <span>{characters.join(', ')}</span>{' '}
          </div>
          <div className={css.feature}>
            <span className={css.featureName}>Education: </span>
            <span>{education}</span>
          </div>
        </div>

        <button className={css.readMoreBtn}>Read more</button>
      </div>
    </div>
  );
}
