import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/redux-hooks';
import '../style.css';

export default function MainPage() {
  const { data, dataUn } = useAppSelector((state) => state.form);
  return (
    <div>
      <Link to="react-hook-form">React Hook Form</Link>
      {data.picture && (
        <div className="image-container">
          <img src={typeof data.picture === 'string' ? data?.picture : ''} />
        </div>
      )}
      <div />
      <Link to="uncontrolled-form">Uncontrolled Form</Link>
      {dataUn.picture && (
        <div>
          <img src={typeof dataUn.picture === 'string' ? dataUn?.picture : ''} />)
        </div>
      )}
    </div>
  );
}
