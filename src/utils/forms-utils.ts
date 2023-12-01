import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver } from 'react-hook-form';

export interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  picture: File;
  country: string;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-ZА-Я].*$/, 'Should start with an uppercase letter')
    .required('Fill field'),
  age: yup.number().positive('Age must be a positive number').required(),
  email: yup.string().email('Invalid email').required('Fill field'),
  password: yup
    .string()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      'The password must contain a number, uppercase and lowercase letters, and a special character'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Fill password field'),
  gender: yup.string().required('Select gender'),
  accept: yup.boolean().oneOf([true], 'Accept Terms'),
  picture: yup
    .mixed()
    .required('You must select an image')
    .test(
      'fileSize',
      'File is too big',
      (value) =>
        value &&
        (value as FileList)[0] &&
        (value as FileList)[0].size <= 1024 * 1024
    )
    .test(
      'fileFormat',
      'Invalid file format',
      (value) =>
        value &&
        (value as FileList)[0] &&
        ['image/jpeg', 'image/png'].includes((value as FileList)[0].type)
    )
    .required('File no choose'),
  country: yup.string().required('Choose the country'),
});

export const resolver = yupResolver(
  validationSchema
) as unknown as Resolver<IFormInput>;

const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });

export const defaultValues: IFormInput = {
  name: '',
  age: 18,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  accept: true,
  picture: emptyFile,
  country: '',
};

export const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
