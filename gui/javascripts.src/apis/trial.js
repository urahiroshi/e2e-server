import axios from 'axios';

const url = '/api/trials';

export default {
  add: (usecaseId) => axios.post(url, { usecaseId }),
  getList: (usecaseId, length) => (
    axios.get(`${url}?usecaseId=${usecaseId}&length=${length}`)
  ),
};
