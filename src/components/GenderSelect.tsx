import React from 'react';

const GenderSelect = () => {
  return (
    <>
      <option value="">--Please choose your gender--</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Non-Binary">Non-Binary</option>
      <option value="not-say">Prefer not to say</option>
    </>
  );
};

export default GenderSelect;
