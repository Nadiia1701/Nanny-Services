import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast, { Toaster } from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase'; // Убедитесь, что путь к файлу с конфигурацией Firebase корректный
import css from './RegistrationForm.module.css';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number'
    )
    .matches('[a-zA-Z]', 'Password can only contain Latin letters.'),
});

export default function RegistrationForm() {
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
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async values => {
    const { name, email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      toast.success('Successfully registered!');
      reset();
      navigate('/nannies');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  const nameClassName = `${css.input} ${errors.name ? css.errorInput : ''}`;
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
        <h2 className={css.title}>Registration</h2>
        <p className={css.info}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
        <div className={css.wrap}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={nameClassName}
                type="text"
                placeholder="Name"
                autoComplete="name"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
            )}
          />
          {errors.name && (
            <span className={css.errorMessage}>{errors.name.message}</span>
          )}
        </div>
        <div className={css.wrap}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={emailClassName}
                type="email"
                placeholder="Email"
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            )}
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
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  className={passwordClassName}
                  autoComplete="current-password"
                  placeholder="Password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
              )}
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
          Sign Up
        </button>
      </form>
    </div>
  );
}
