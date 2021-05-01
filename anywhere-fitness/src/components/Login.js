import React from 'react';

export default function Login(props) {
  const { login, values, change } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login();
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    change(name, value);
  };

  return (
    <div className="loginContainer">
      <form action="login" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={values.username}
            onChange={onChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={onChange}
          />
        </label>

        <br />
        <button onClick={handleSubmit} id="login-button">Login</button>

      </form>
      <p>
        <img src=' https://previews.123rf.com/images/zerbor/zerbor1701/zerbor170100081/70641546-fitness-equipment-on-a-dark-background-time-for-fitness.jpg' alt='time for fitness' />
      </p>
    </div>
  );
}
