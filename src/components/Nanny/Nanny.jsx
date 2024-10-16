import { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaMapLocationDot } from 'react-icons/fa6';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';
import NannyReviews from '../NannyReviews/NannyReviews';
import MakeAnAppointmentBtn from '../MakeAnAppointmentBtn/MakeAnAppointmentBtn';
import { useFavorites } from '../FavoritesContext';
import css from './Nanny.module.css';

export default function Nanny({ item }) {
  const [showReviews, setShowReviews] = useState(false);
  const [user, setUser] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some(favNanny => favNanny.id === item.id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleClickButtonHeart = () => {
    if (!user) {
      toast.error('This action is available for authorized users only.');
      return;
    }
    if (isFavorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
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
          <img src={item.avatar_url} alt={item.name} className={css.image} />
        </div>

        <div className={css.details}>
          <div className={css.hatContainer}>
            <div className={css.nameContainer}>
              <span className={css.nanny}>Nanny</span>
              <h2 className={css.name}>{item.name}</h2>
            </div>

            <div className={css.infoContainer}>
              <div className={css.infoWrapper}>
                <span className={css.location}>
                  <FaMapLocationDot className={css.locationIcon} />
                  {typeof item.location === 'string'
                    ? item.location
                    : 'Unknown Location'}
                </span>
                <span className={css.rating}>
                  <AiFillStar className={css.starIcon} />
                  <p>Rating: {item.rating}</p>
                </span>
                <p className={css.price}>
                  Price / 1 hour:{' '}
                  <span className={css.valuePrice}>
                    {item.price_per_hour.toFixed(0)}$
                  </span>
                </p>
              </div>
              <button
                className={css.heartContainer}
                onClick={handleClickButtonHeart}
              >
                {isFavorite ? (
                  <GoHeartFill className={css.iconFillHeart} />
                ) : (
                  <GoHeart className={css.iconHeart} />
                )}
              </button>
            </div>
          </div>

          <div className={css.features}>
            <div className={css.feature}>
              <span className={css.featureName}>Age: </span>
              <span className={css.featureValueAge}>
                {calculateAge(item.birthday)}
              </span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Experience: </span>
              <span className={css.featureValue}>{item.experience}</span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Kids Age: </span>
              <span className={css.featureValue}>{item.kids_age}</span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Characters: </span>
              <span className={css.featureValue}>
                {item.characters.join(', ')}
              </span>
            </div>
            <div className={css.feature}>
              <span className={css.featureName}>Education: </span>
              <span className={css.featureValue}>{item.education}</span>
            </div>
          </div>

          <p className={css.description}>{item.about}</p>

          <div className={css.reviews}>
            {showReviews && <NannyReviews reviews={item.reviews} />}
            {showReviews ? (
              <MakeAnAppointmentBtn
                nannyName={item.name}
                avatarUrl={item.avatar_url}
              />
            ) : (
              <button
                onClick={() => setShowReviews(!showReviews)}
                className={css.readMoreBtn}
              >
                Read more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
