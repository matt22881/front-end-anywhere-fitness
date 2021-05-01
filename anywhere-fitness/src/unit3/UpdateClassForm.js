import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { ClassContext } from '../App';

export default function UpdateClassForm() {
  const params = useParams();
  const history = useHistory();
  const { inputs, setInputs } = useContext(ClassContext);
  //   const [ formValues, setFormValues] = useState([])

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/auth/users/classes/`)
      .then((res) => {
        let newArr = res.data.data.filter((cls) => cls.id === params.id);
        setInputs(newArr[0]);
      });
  }, [params.id, setInputs]);

  const updateClass = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/auth/instructor/classes/${params.id}`, inputs)
      .then((res) => {
        console.log(res);
        history.push('/instructor');
      });
  };
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div className='updateClassContainer'>
      <h2>Update a class:</h2>
      <form onSubmit={updateClass}>
        <label>
          Name of Class:
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={inputs.type}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={inputs.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={inputs.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Intensity:
          <select name="intensity" onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Current number of registered attendees:
          <input
            type="text"
            name="signedUp"
            value={inputs.signedUp}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Maximum class size:
          <input
            type="text"
            name="max_size"
            value={inputs.max_size}
            onChange={handleChange}
          />
        </label>
        <br />

        <button>Update Class</button>
      </form>
    </div>
  );
}
