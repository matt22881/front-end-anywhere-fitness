import './App.css';
import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import * as yup from 'yup';
import schema from './validation/loginSchema';
import About from './components/About';
import Complete from './components/Complete';
import Contact from './components/Contact';
import Home from './components/Home';
import InstructorClassList from './unit3/InstructorClassList';
import PrivateRoute from './unit3/PrivateRoute';
import AddClassForm from './unit3/AddClassForm';
import UpdateClassForm from './unit3/UpdateClassForm';
import ClientClassList from './unit3/ClientClassList';

//initial values for class
export const initialValues = {
  title: '',
  instructorId: '',
  categoryId: '',
  // scheduleTime: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

//creating context
export const ClassContext = createContext();
const initialDisabled = true;
const initialFormErrors = [];
const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  username: '',
};
const initialClassList = {
  title: '',
  id: '',
  instructorId: '',
  categoryId: '',
  scheduleTime: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};
const initialLoginValues = {
  username: '',
  password: '',
};

function App() {
  const [clientClassList, setClientClassList] = useState(initialClassList);
  const [inputs, setInputs] = useState(initialValues);
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [disabled, setDisabled] = useState(initialDisabled);

  // On change handler for the form values in Register.js
  const onChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ' ',
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Submit function for Register.js
  const onSubmit = () => {
    const newUser = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      username: formValues.username.trim(),
      roleId: parseInt(formValues.roleId),
    };

    postNewUser(newUser);
    history.push('/registration-complete');
  };

  // On change handler for the login values in Login.js
  const loginChange = (name, value) => {
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  // Login function
  const onLogin = () => {
    const user = {
      username: loginValues.username,
      password: loginValues.password,
    };
    loginUser(user);
  };

  // POST request for Login.js
  const loginUser = (user) => {
    axios
      .post('https://anywhere-fitness-pt185.herokuapp.com/api/auth/login', user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.roleId === 1) {
          history.push('/instructor');
        } else {
          history.push('/client');
        }
      })
      .catch((err) => {
        console.error('Axios login post error', err);
      });
  };

  // Used to enable the submit button in Register.js
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  // POST request for Register.js
  const postNewUser = (newUser) => {
    axios
      .post(
        `https://anywhere-fitness-pt185.herokuapp.com/api/auth/register`,
        newUser
      )
      .catch((err) => {
        console.log('Axios post error', err);
      });
  };

  return (
    <div>
      <ClassContext.Provider
        value={{ clientClassList, setClientClassList, inputs, setInputs }}>
        <nav>
          <h1>Anywhere Fitness</h1>
          <h2>Your Fitness Journey Starts Here!</h2>
          <div className="nav-links">
            <Link to="/">
              <button className="home-button">Home</button>
            </Link>
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
            <Link to="/about">
              <button className="about-button">About</button>
            </Link>
            <Link to="/contact">
              <button className="contact-button">Contact</button>
            </Link>
          </div>
        </nav>

        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/register">
            <Register
              values={formValues}
              errors={formErrors}
              change={onChange}
              submit={onSubmit}
              disabled={disabled}
            />
          </Route>
          <Route exact path="/login">
            <Login values={loginValues} change={loginChange} login={onLogin} />
          </Route>
          <Route exact path="/registration-complete" component={Complete} />

          <PrivateRoute path="/instructor" component={InstructorClassList} />
          <Route path="/add-class" component={AddClassForm} />
          <Route path="/update-class/:id" component={UpdateClassForm} />
          <PrivateRoute path="/client" component={ClientClassList} />
        </div>
      </ClassContext.Provider>
    </div>
  );
}

export default App;
