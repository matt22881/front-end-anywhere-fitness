import axios from 'axios';

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: localStorage.getItem('token'),
    },
    baseURL: 'https://anywhere-fitness-pt185.herokuapp.com/',
  });
};

