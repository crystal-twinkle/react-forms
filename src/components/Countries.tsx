import React from 'react';
import { useAppSelector } from '../store/redux-hooks';

const Countries = () => {
  const { countries } = useAppSelector((state) => state.countries);

  return (
    <datalist id="countries">
      {countries.map((country, index) => (
        <option key={index} value={country.name.common} />
      ))}
    </datalist>
  );
};

export default Countries;
