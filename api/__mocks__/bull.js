const trialQueue = {
  getJob: () => (
    new Promise((resolve) => {
      resolve({
        data: {},
        getState: () => (
          new Promise((resolve) => {
            resolve('Running');
          })
        ),
        timestamp: (new Date()).getTime()
      });
    })
  ),
  add: (trialId) => new Promise((resolve) => { resolve(); })
};

const Queue = (name) => {
  if (name === 'trial') {
    return trialQueue;
  }
};

module.exports = Queue;
