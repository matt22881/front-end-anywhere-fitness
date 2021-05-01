import React from 'react';

export default function Register(props) {
  const { submit, disabled, errors, values, change } = props;

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  return (
    <div className="registerContainer">
      <form action="register" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="firstName">
          First name:
          <input
            id="firstNameInput"
            type="text"
            name="firstName"
            placeholder="First name"
            value={values.firstName}
            onChange={onChange}
          />
        </label>
        <label htmlFor="lastName">
          Last name:
          <input
            id="lastNameInput"
            type="text"
            name="lastName"
            placeholder="Last name"
            value={values.lastName}
            onChange={onChange}
          />
        </label>
        <label htmlFor="email">
          Email address:
          <input
            id="emailInput"
            type="email"
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={onChange}
          />
        </label>
        <label htmlFor="username">
          Username:
          <input
            id="usernameInput"
            type="text"
            name="username"
            placeholder="Enter a username"
            values={values.username}
            onChange={onChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="passwordInput"
            type="password"
            name="password"
            placeholder="Enter a password"
            value={values.password}
            onChange={onChange}
          />
        </label>
        <div>
          Are you staff?
          <input name="roleId" type="radio" value="1" onChange={onChange} />
          Yes
          <input name="roleId" type="radio" value="2" onChange={onChange} />
          No
        </div>

        <button id="submit" disabled={disabled} onClick={handleSubmit}>
          Submit
        </button>
        <div className="errors">
          <div>{errors.firstName}</div>
          <div>{errors.lastName}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.username}</div>
        </div>
      </form>
      <p>
        <img src='https://ffc.com/wp-content/uploads/2018/03/Welcome-New-Staff-FFC-Chicago-845x321.jpg' alt='welcome' />
      </p>
    </div>
  );
}
