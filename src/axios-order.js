import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-7f114.firebaseio.com/'
});

export default instance;
