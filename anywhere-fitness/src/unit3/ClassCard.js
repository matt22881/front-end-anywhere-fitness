import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

export default function ClassCard({
  cls,
  setInstructorClasses,
  instructorClasses,
}) {
  const history = useHistory();

  const deleteClass = (e) => {
    e.preventDefault();
    console.log(cls.id);
    axiosWithAuth()
      .delete(`/api/classes/${cls.id}`)
      .then((res) => {
        console.log('Deleted', res);
        const list = instructorClasses.filter((el) => el.id !== cls.id);
        setInstructorClasses(list);
      });
  };
  return (
    <div key={cls.id}>
      {cls.title && <h1>Name: {cls.title}</h1>}
      {cls.categoryId && <h3>Type of class: {cls.categoryId}</h3>}
      {cls.instructorId && <h3>Instructor: {cls.instructorId}</h3>}
      {cls.scheduleTime && <p>Date: {cls.scheduleTime}</p>}
      {cls.address && <p>Address: {cls.address}</p>}
      {cls.city && <p>City: {cls.city}</p>}
      {cls.state && <p>State: {cls.state}</p>}
      <button onClick={() => history.push(`/update-class/${cls.id}`)}>
        Edit Class
      </button>
      <button onClick={deleteClass}>Delete Class</button>
    </div>
  );
}
