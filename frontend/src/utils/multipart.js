import axios from 'axios';

export default axios.create({
  baseURL: 'https://k3a409.p.ssafy.io/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

