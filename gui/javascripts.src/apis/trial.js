import axios from 'axios';

const url = '/api/trials/';

export default {
  add: (usecaseId) => axios.post(url, { usecaseId }),
};
