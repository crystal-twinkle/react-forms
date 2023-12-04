import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/redux-hooks';
import '../style.css';

export default function MainPage() {
  const { data, dataUn } = useAppSelector((state) => state.form);

  return (
    <div>
      <div className={data.isNew ? 'highlight' : ''}>
        <Link to="react-hook-form">React Hook Form</Link>
      </div>
      {data.picture && (
        <div className="image-container">
          <img src={typeof data.picture === 'string' ? data?.picture : ''} />
        </div>
      )}
      <div className={dataUn.isNew ? 'highlight' : ''}>
        <Link to="uncontrolled-form">Uncontrolled Form</Link>
      </div>
      {dataUn.picture && (
        <div className="image-container">
          <img src={typeof dataUn.picture === 'string' ? dataUn?.picture : ''} />)
        </div>
      )}
    </div>
  );
}
