import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { ClassContext } from '../App';

export default function ClientClassList() {
  const { clientClassList, setClientClassList } = useState([]);
  const getClassList = () => {
    axiosWithAuth()
      .get('/api/classes')
      .then((res) => {
        console.log(res);
        setClientClassList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClassList();
  });

  return (
    <div className='availableClasContainer'>
      <h1>Available classes:</h1>
      {clientClassList.map((cls) => {
        return (
          <div>
            {cls.title && <h2>Name: {cls.title}</h2>}
            {cls.categoryId && <h3>Type of class: {cls.categoryId}</h3>}
            {cls.instructorId && <h3>Instructor: {cls.instructorId}</h3>}
            {cls.scheduleTime && <p>Date: {cls.scheduleTime}</p>}
            {cls.city && <p>City: {cls.city}</p>}
            {cls.state && <p>State: {cls.state}</p>}
            {cls.location && <p>Address: {cls.location}</p>}
          </div>
        );
      })}
    </div>
  );
}
