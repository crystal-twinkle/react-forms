import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useActions } from '../store/redux-hooks';
import { convertFileToBase64, defaultValues, IFormInput, resolver } from '../utils/forms-utils';
import '../style.css';
import Countries from '../components/Countries';
import GenderSelect from '../components/GenderSelect';
import FormElem from '../components/FormElem';

export default function ControlledPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver,
    defaultValues,
  });

  const { setHookFormData } = useActions();

  const submit: SubmitHandler<IFormInput> = async (data) => {
    data.picture = (await convertFileToBase64(data.picture[0] as unknown as File)) as string;

    setHookFormData(data);
  };

  return (
    <div>
      <h2>ReactHookForm</h2>
      <form onSubmit={handleSubmit(submit)}>
        <FormElem type="text" id="name" register={register} errors={errors} />
        <FormElem type="number" id="age" register={register} errors={errors} />
        <FormElem type="email" id="email" register={register} errors={errors} />
        <FormElem type="password" id="password" register={register} errors={errors} />
        <FormElem type="password" id="confirmPassword" register={register} errors={errors} />

        <div>
          <label htmlFor="gender">gender</label>
          <select {...register('gender')} id="gender">
            <GenderSelect />
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
          <label htmlFor="country">Countries</label>
          <input type="text" list="countries" {...register('country')} id="country" />
          <Countries />
          <p className={'error-message'}>{errors.country?.message}</p>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
