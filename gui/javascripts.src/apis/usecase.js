import axios from 'axios';

const url = '/api/usecases';

export default {
  getList: () => axios.get(url),
  add: (usecase) => axios.post(url, usecase),
  modify: (usecase, newUsecase) => axios.put(`${url}/${usecase.id}/`, newUsecase),
  delete: (usecase) => axios.delete(`${url}/${usecase.id}/`),
};
