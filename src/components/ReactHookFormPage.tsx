import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../store/redux-hooks';
import { defaultValues, IFormInput, resolver } from '../utils/forms-utils';
import '../style.css';

export default function ReactHookFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver,
    defaultValues,
  });

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
          <p className={'error-message'}>{errors?.name?.message} </p>
        </div>
        <div>
          <label htmlFor="age">age</label>
          <input type="number" {...register('age')} id="age" />
          <p className={'error-message'}>{errors.age?.message}</p>
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" {...register('email')} id="email" />
          <p className={'error-message'}>{errors?.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" {...register('password')} id="password" />
          <p className={'error-message'}>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">repeat password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            id="confirmPassword"
          />
          <p className={'error-message'}>{errors.confirmPassword?.message}</p>
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
          <p className={'error-message'}>{errors.gender?.message}</p>
        </div>
        <div>
          <label htmlFor="accept">accept</label>
          <input type="checkbox" {...register('accept')} id="accept" />
        </div>
        <div>
          <label htmlFor="picture">picture</label>
          <input type="file" {...register('picture')} id="picture" />
          <p className={'error-message'}>{errors.picture?.message}</p>
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
          <p className={'error-message'}>{errors.country?.message}</p>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
