import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Toaster } from 'react-hot-toast';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import css from './LogInForm.module.css';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches('^(?!.*@[^,]*,)', 'Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number'
    )
    .matches('[a-zA-Z]', 'Password can only contain Latin letters.'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async values => {
    try {
      await dispatch(logIn(values)).unwrap();
      toast.success('Successfully logged in!');
      reset();
      navigate('/nannies');
    } catch (error) {
      toast.error(error?.message || 'Log in failed');
    }
  };

  const emailClassName = `${css.input} ${errors.email ? css.errorInput : ''}`;
  const passwordClassName = `${css.input} ${
    errors.password ? css.errorInput : ''
  }`;

  return (
    <div className={css.formWrap}>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className={css.form}
      >
        <h2 className={css.title}>Log In</h2>
        <p className={css.info}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
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
          <div className={css.passwordBox}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    className={passwordClassName}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                );
              }}
            />
            <div
              className={css.iconeye}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.password && (
            <span className={css.errorMessage}>{errors.password.message}</span>
          )}
        </div>
        <button className={css.btn} type="submit" disabled={isSubmitting}>
          Log In
        </button>
      </form>
    </div>
  );
}
