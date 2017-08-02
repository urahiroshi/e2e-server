import axios from 'axios';

export default {
  get: ({ projectId, iterationNumber }) => (
    axios.get(`/api/projects/${projectId}/iterations/${iterationNumber}`)
  ),
};
