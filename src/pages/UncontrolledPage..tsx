import React, { createRef, FormEvent } from 'react';
import GenderSelect from '../components/GenderSelect';
import FormElem from '../components/FormElem';
import { convertFileToBase64, IFormInput, validationSchema } from '../utils/forms-utils';
import Countries from '../components/Countries';
import { ValidationError } from 'yup';
import { useActions, useAppSelector } from '../store/redux-hooks';
import { useNavigate } from 'react-router-dom';

export default function UncontrolledPage() {
  const navigate = useNavigate();
  const nameRef = createRef<HTMLInputElement>();
  const ageRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const repeatPasswordRef = createRef<HTMLInputElement>();
  const genderRef = createRef<HTMLSelectElement>();
  const pictureRef = createRef<HTMLInputElement>();
  const acceptRef = createRef<HTMLInputElement>();
  const countryRef = createRef<HTMLInputElement>();
  const { errors } = useAppSelector((state) => state.form);
  const { saveUncontrolledErrors, setUncontrolledData } = useActions();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: IFormInput = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: repeatPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      picture: pictureRef.current?.files || '',
      accept: acceptRef.current?.checked || false,
      country: countryRef.current?.value || '',
    };
    try {
      await validationSchema.validate(data, { abortEarly: false });
      data.picture = (await convertFileToBase64(data.picture[0] as unknown as File)) as string;
      setUncontrolledData(data);
      navigate('/', { state: { from: '/uncontrolled-form' } });
    } catch (errors) {
      const errorsUpd: Record<string, string> = {};
      if (errors instanceof ValidationError) {
        errors.inner.forEach((error) => {
          if (error.path) {
            errorsUpd[error.path] = error.message;
          }
        });
        saveUncontrolledErrors(errorsUpd);
      }
    }
  };

  return (
    <div>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <FormElem type="string" id="name" ref={nameRef} errorsUn={errors} />
        <FormElem type="number" id="age" ref={ageRef} errorsUn={errors} />
        <FormElem type="email" id="email" ref={emailRef} errorsUn={errors} />
        <FormElem type="password" id="password" ref={passwordRef} errorsUn={errors} />
        <FormElem type="password" id="confirmPassword" ref={repeatPasswordRef} errorsUn={errors} />
        <div>
          <label htmlFor="gender">gender</label>
          <select ref={genderRef} id="gender">
            <GenderSelect />
          </select>
        </div>
        <FormElem type="file" id="picture" ref={pictureRef} errorsUn={errors} />
        <FormElem type="checkbox" id="accept" ref={acceptRef} errorsUn={errors} />
        <div>
          <label htmlFor="country">Countries</label>
          <input type="text" list="countries" ref={countryRef} id="country" />
          <Countries />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
