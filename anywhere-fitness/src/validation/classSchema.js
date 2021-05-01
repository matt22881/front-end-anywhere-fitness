import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required(),
  instructorId: yup.number().required(),
  categoryId: yup.number().required(),
  scheduleTime: yup.date(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zipCode: yup.string(),
});
