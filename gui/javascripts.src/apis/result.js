import axios from 'axios';

const url = '/api/results';

export default {
  getList: (trialId) => {
    const getUrl = (trialId == undefined) ? url : `${url}?jobId=${trialId}`;
    return axios.get(getUrl);
  },
};
