import axios from 'axios';

const url = '/api/trials';

export default {
  get: ({ trialId }) => (
    axios.get(`${url}/${trialId}`)
  ),
};
