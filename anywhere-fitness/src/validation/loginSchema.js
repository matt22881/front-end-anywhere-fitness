import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  roleId: yup.number().required(),
  username: yup
    .string()
    .min(2, 'Username must be longer than 2 characters.')
    .required('Username is required'),
  password: yup.string().required('Please enter a password.'),
  email: yup.string().email(),
});
