import axios from 'axios';
import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Usecases from './views/containers/usecases';
import Usecase from './views/containers/usecase';
import { setUsecases, setUsecase } from './actions/usecases';
import { setNewUsecase, resetNewUsecase } from './actions/new-usecase';
import { setTrials, setTrial, resetTrial, setResult } from './actions/trials';

const AppRouterComponent = ({
  onEnterUsecases,
  onLeaveUsecases,
  onEnterUsecase,
  onLeaveUsecase,
  onEnterTrial,
  onLeaveTrial,
}) => {
  const routes = {
    path: '/',
    indexRoute: {
      component: Usecases,
      onEnter: onEnterUsecases,
    },
    childRoutes: [
      {
        path: 'usecases',
        component: Usecases,
        onEnter: onEnterUsecases,
        onLeave: onLeaveUsecases,
      },
      {
        path: 'usecases/:id',
        component: Usecase,
        onEnter: onEnterUsecase,
        onLeave: onLeaveUsecase,
      },
      {
        path: 'usecases/:usecaseId/trials/:trialId',
        component: Usecase,
        onEnter: onEnterTrial,
        onLeave: onLeaveTrial,
      },
    ],
  };
  return <Router history={browserHistory} routes={routes} />;
};

AppRouterComponent.propTypes = {
  onEnterUsecases: PropTypes.func.isRequired,
  onLeaveUsecases: PropTypes.func.isRequired,
  onEnterUsecase: PropTypes.func.isRequired,
  onLeaveUsecase: PropTypes.func.isRequired,
  onEnterTrial: PropTypes.func.isRequired,
  onLeaveTrial: PropTypes.func.isRequired,
};

const getUsecases = ({ dispatch }) => {
  axios.get('/api/usecases').then((response) => {
    dispatch(setUsecases(response.data));
  });
};

const getUsecase = ({ dispatch, usecaseId }) => {
  axios.get(`/api/usecases/${usecaseId}`).then((response) => {
    dispatch(setUsecase(response.data));
    dispatch(setNewUsecase(response.data));
  });
};

const getTrials = ({ dispatch, usecaseId, length, selectedTrialId }) => {
  axios.get(`/api/trials?usecaseId=${usecaseId}&length=${length}`).then(
    (response) => {
      const trials = response.data;
      dispatch(setTrials(trials));
      if (selectedTrialId) {
        const selectedTrial = trials.find((trial) => trial.id === selectedTrialId);
        if (selectedTrial) { dispatch(setTrial(selectedTrial)); }
      }
    }
  );
};

const getResult = ({ dispatch, trialId }) => {
  axios.get(`/api/results?jobId=${trialId}`).then((response) => {
    dispatch(setResult({ trialId, result: response.data[0] }));
  });
};

const mapDispatchToProps = (dispatch) => ({
  onEnterUsecases: () => {
    getUsecases({ dispatch });
  },
  onLeaveUsecases: () => {
    dispatch(resetNewUsecase());
  },
  onEnterUsecase: ({ params }) => {
    const usecaseId = Number(params.id);
    getUsecase({ dispatch, usecaseId });
    getTrials({ dispatch, usecaseId, length: 10 });
  },
  onLeaveUsecase: () => {
    dispatch(resetNewUsecase());
  },
  onEnterTrial: ({ params }) => {
    const usecaseId = Number(params.usecaseId);
    const trialId = Number(params.trialId);
    getUsecase({ dispatch, usecaseId });
    getTrials({ dispatch, usecaseId, length: 10, selectedTrialId: trialId });
    getResult({ dispatch, trialId });
  },
  onLeaveTrial: () => {
    dispatch(resetTrial());
  },
});

export default connect(undefined, mapDispatchToProps)(AppRouterComponent);
