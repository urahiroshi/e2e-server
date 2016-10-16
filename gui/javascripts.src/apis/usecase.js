import axios from 'axios';

const url = '/api/usecases/';

export default {
  add: (usecase) => axios.post(url, usecase),
  modify: (usecase, newUsecase) => axios.put(`${url}${usecase.id}/`, newUsecase),
  delete: (usecase) => axios.delete(`${url}${usecase.id}/`),
};
