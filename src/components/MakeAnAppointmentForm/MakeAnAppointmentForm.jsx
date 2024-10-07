import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import css from './MakeAnAppointmentForm.module.css';
import TimeDropdown from '../TimeDropdown/TimeDropdown';

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, 'Phone must be in +380 format')
    .required('Phone is required'),
  childAge: yup.string().required("Child's age is required"),
  meetingTime: yup.string().required('Meeting time is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  parentName: yup.string().required("Parent's name is required"),
  comment: yup.string(),
});

export default function MakeAnAppointmentForm({ nannyName, avatarUrl }) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      address: '',
      phone: '',
      childAge: '',
      meetingTime: '',
      email: '',
      parentName: '',
      comment: '',
    },
  });

  const onSubmit = async values => {
    try {
      console.log(values);
      reset();
      navigate('/nannies');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Appointment failed');
      } else {
        toast.error(error.message || 'Appointment failed');
      }
    }
  };

  const addressClassName = `${css.inputHalf} ${
    errors.address ? css.errorInput : ''
  }`;
  const phoneClassName = `${css.inputHalf} ${
    errors.phone ? css.errorInput : ''
  }`;
  const childAgeClassName = `${css.inputHalf} ${
    errors.childAge ? css.errorInput : ''
  }`;
  const meetingTimeClassName = `${css.inputHalf} ${
    errors.meetingTime ? css.errorInput : ''
  }`;
  const parentNameClassName = `${css.input} ${
    errors.parentName ? css.errorInput : ''
  }`;
  const emailClassName = `${css.input} ${errors.email ? css.errorInput : ''}`;
  const commentClassName = `${css.input} ${
    errors.comment ? css.errorInput : ''
  }`;

  return (
    <div className={css.formWrap}>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className={css.form}
      >
        <h2 className={css.title}>Make an appointment with a babysitter</h2>
        <p className={css.info}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
        <div className={css.nannyDetails}>
          <img src={avatarUrl} alt={nannyName} className={css.nannyAvatar} />
          <div className={css.nameContainer}>
            <span className={css.nanny}>Your nanny</span>
            <h3 className={css.nannyName}>{nannyName}</h3>
          </div>
        </div>
        <div className={css.addressPhoneContainer}>
          <div className={css.wrap}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    className={addressClassName}
                    type="address"
                    placeholder="Address"
                    autoComplete="address"
                    aria-invalid={errors.address ? 'true' : 'false'}
                  />
                );
              }}
            />
            {errors.address && (
              <span className={css.errorMessage}>{errors.address.message}</span>
            )}
          </div>
          <div className={css.wrap}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    className={phoneClassName}
                    type="phone"
                    placeholder="+380"
                    autoComplete="phone"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                );
              }}
            />
            {errors.phone && (
              <span className={css.errorMessage}>{errors.phone.message}</span>
            )}
          </div>
        </div>
        <div className={css.ageTimeContainer}>
          <div className={css.wrap}>
            <Controller
              name="childAge"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    className={childAgeClassName}
                    type="text"
                    placeholder="Child's Age"
                    autoComplete="childAge"
                    aria-invalid={errors.childAge ? 'true' : 'false'}
                  />
                );
              }}
            />
            {errors.childAge && (
              <span className={css.errorMessage}>
                {errors.childAge.message}
              </span>
            )}
          </div>
          <div className={css.wrap}>
            <Controller
              name="meetingTime"
              control={control}
              render={({ field }) => (
                <TimeDropdown
                  value={field.value}
                  onChange={field.onChange}
                  className={meetingTimeClassName}
                />
              )}
            />
            {errors.meetingTime && (
              <span className={css.errorMessage}>
                {errors.meetingTime.message}
              </span>
            )}
          </div>
        </div>
        <div className={css.wrap}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <input
                  {...field}
                  className={emailClassName}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              );
            }}
          />
          {errors.email && (
            <span className={css.errorMessage}>{errors.email.message}</span>
          )}
        </div>
        <div className={css.wrap}>
          <Controller
            name="parentName"
            control={control}
            render={({ field }) => {
              return (
                <input
                  {...field}
                  className={parentNameClassName}
                  type="text"
                  placeholder="Father's or mother's name"
                  autoComplete="parentName"
                  aria-invalid={errors.parentName ? 'true' : 'false'}
                />
              );
            }}
          />
          {errors.parentName && (
            <span className={css.errorMessage}>
              {errors.parentName.message}
            </span>
          )}
        </div>
        <div className={css.wrap}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => {
              return (
                <textarea
                  {...field}
                  className={commentClassName}
                  type="comment"
                  placeholder="Comment"
                  autoComplete="comment"
                  aria-invalid={errors.comment ? 'true' : 'false'}
                />
              );
            }}
          />
          {errors.comment && (
            <span className={css.errorMessage}>{errors.comment.message}</span>
          )}
        </div>

        <button className={css.btn} type="submit" disabled={isSubmitting}>
          Send
        </button>
      </form>
    </div>
  );
}
