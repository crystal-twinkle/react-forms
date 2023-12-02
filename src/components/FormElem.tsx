import React, { forwardRef } from 'react';
import { DeepMap, FieldValues, UseFormRegister } from 'react-hook-form';
import { IFormInput } from '../utils/forms-utils';

interface IFormElemProps {
  type: string;
  id: keyof IFormInput;
  register?: UseFormRegister<IFormInput>;
  errors?: DeepMap<FieldValues, FieldValues>;
  errorsUn?: DeepMap<FieldValues, FieldValues>;
}

const FormElem = forwardRef<HTMLInputElement, IFormElemProps>((props, ref) => {
  const { id, register, errors, type, errorsUn } = props;
  return (
    <div>
      <label style={{ marginRight: '5px' }} htmlFor={id}>
        {id.replace(/^./, (str) => str.toUpperCase())}
      </label>
      <input type={type} {...(register && { ...register(id) })} id={id} {...(ref && { ref })} />
      <p className={'error-message'}>{errors && errors[id]?.message}</p>
      <p className={'error-message'}>{errorsUn && errorsUn[id]}</p>
    </div>
  );
});

export default FormElem;
