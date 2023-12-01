import React, { useEffect } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../store/redux-hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().positive('Age must be a positive number').required(),
  email: yup.string().email('Invalid email').required(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
  confirmPassword: yup
    .string()
    .required('resetPasswordForm.mandatoryInput')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required(),
  accept: yup.boolean().oneOf([true]),
  picture: yup.string().url('Invalid URL').required(),
  country: yup.string().required(),
});

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  picture: string;
  country: string;
}

const resolver = yupResolver(validationSchema) as Resolver<IFormInput>;

export default function ReactHookFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
  } = useForm<IFormInput>({
    resolver,
    defaultValues: {
      name: '',
      age: 18,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      accept: true,
      picture: '',
      country: '',
    },
  });

  useEffect(() => {
    console.log(isValid);
    console.log(isValidating);
    console.log(errors);
  }, [isValid, isValidating, errors]);

  const { countries } = useAppSelector((state) => state.countries);

  const submit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>ReactHookForm</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" {...register('name')} id="name" />
          {errors?.name && <p>{errors?.name?.message} </p>}
        </div>
        <div>
          <label htmlFor="age">age</label>
          <input type="number" {...register('age')} id="age" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" {...register('email')} id="email" />
          {errors?.email && <p>{errors?.email?.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" {...register('password')} id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">repeat password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            id="confirmPassword"
          />
        </div>
        <div>
          <label htmlFor="gender">gender</label>
          <select {...register('gender')} id="gender">
            <option value="">--Please choose your gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="not-say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="accept">accept</label>
          <input type="checkbox" {...register('accept')} id="accept" />
        </div>
        <div>
          <label htmlFor="picture">picture</label>
          <input type="file" {...register('picture')} id="picture" />
        </div>
        <div>
          <label htmlFor="country">countries</label>
          <input
            type="text"
            list="countries"
            {...register('country')}
            id="country"
          />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country.name.common} />
            ))}
          </datalist>
        </div>
        <div>
          <button type="submit" disabled={isValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
