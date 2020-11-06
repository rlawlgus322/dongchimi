import axios from 'axios';

export default axios.create({
  baseURL: 'http://k3a409.p.ssafy.io/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
