import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

import ClassCard from './ClassCard';
import { ClassContext } from '../App';

export default function InstructorClassList() {
  const [instructorClasses, setInstructorClasses] = useState([]);
  const { inputs } = useContext(ClassContext);

  const history = useHistory();

  const getClassList = () => {
    axiosWithAuth()
      .get('/api/classes')
      .then((res) => {
        console.log(res);
        const x = res.data.filter(
          (cls) => cls.instructorId === inputs.instructorId
        );
        console.log(inputs.instructorId);
        console.log(x);
        setInstructorClasses(res.data); // Needs to go back to 'x' or something similar if that's how we want it to appear, as just the instructor that is logged in
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getClassList(); // eslint-disable-next-line
  }, []);

  return (
    <div className='instructorClassContainer'>
      <h2>Your Current Classes:</h2>
      <div>
        {instructorClasses.map((cls) => {
          return (
            <ClassCard
              setInstructorClasses={setInstructorClasses}
              instructorClasses={instructorClasses}
              cls={cls}
            />
          );
        })}
      </div>
      <button onClick={() => history.push('/add-class')}>
        Make a new class
      </button>
    </div>
  );
}
