import axios from 'axios';

const url = '/api/projects';

export default {
  get: ({ projectId }) => (
    axios.get(`${url}/${projectId}`)
  ),
};
