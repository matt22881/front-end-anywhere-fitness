import React, { useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { ClassContext } from '../App';
import { initialValues } from '../App';

export default function AddClassForm() {
  const history = useHistory();
  const { inputs, setInputs } = useContext(ClassContext);
  // console.log('My name is', inputs.instructor_name);

  const handleChange = (e) => {
    // const valueToUse = type === 'checkbox' ? checked : value
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const postNewClass = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/classes', inputs)
      .then((res) => {
        console.log(res);
        history.push('/instructor');
        setInputs(initialValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='addClassContainer'>
      <h2>Add a New Class:</h2>
      <form onSubmit={postNewClass}>
        <label>
          Name of Class:
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* <label>
          Type:
          <input
            type="text"
            name="categoryId"
            value={inputs.categoryId}
            onChange={handleChange}
          />
        </label> */}
        <br />
        <label>
          Date:
          <input
            type="date"
            name="scheduleTime"
            value={inputs.scheduleTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Instructor ID:
          <input
            type="integer"
            name="instructorId"
            value={inputs.instructorId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <select name="categoryId" onChange={handleChange}>
            <option value="1">Pilates</option>
            <option value="2">Yoga</option>
            <option value="3">Lagree</option>
            <option value="4">Barre</option>
            <option value="5">Spin</option>
            <option value="6">Zumba</option>
          </select>
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={inputs.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={inputs.state}
            onChange={handleChange}
          />
        </label>
        <br />

        <button>Add Class</button>
      </form>
    </div>
  );
}
