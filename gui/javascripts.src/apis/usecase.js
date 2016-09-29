import axios from 'axios';

const url = '/api/usecases/';

export default {
  add: (usecase) => axios.post(url, usecase),
};
