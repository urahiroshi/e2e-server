import axios from 'axios';
import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Usecases from './views/containers/usecases';
import { setUsecases } from './actions/usecases';
import { setUsecase } from './actions/usecase';
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
        component: Usecases,
        onEnter: onEnterUsecase,
        onLeave: onLeaveUsecase,
      },
      {
        path: 'usecases/:usecaseId/trials/:trialId',
        component: Usecases,
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

const getUsecases = ({ dispatch, selectedUsecaseId }) => {
  axios.get('/api/usecases').then((response) => {
    const usecases = response.data;
    dispatch(setUsecases(usecases));
    if (selectedUsecaseId) {
      const selectedUsecase = usecases.find(
        (usecase) => usecase.id === selectedUsecaseId
      );
      if (selectedUsecase) {
        dispatch(setUsecase(selectedUsecase));
        dispatch(setNewUsecase(selectedUsecase));
      }
    }
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
    getUsecases({ dispatch, selectedUsecaseId: usecaseId });
    getTrials({ dispatch, usecaseId, length: 10 });
  },
  onLeaveUsecase: () => {
    dispatch(resetNewUsecase());
  },
  onEnterTrial: ({ params }) => {
    const usecaseId = Number(params.usecaseId);
    const trialId = Number(params.trialId);
    getUsecases({ dispatch, selectedUsecaseId: usecaseId });
    getTrials({ dispatch, usecaseId, length: 10, selectedTrialId: trialId });
    getResult({ dispatch, trialId });
  },
  onLeaveTrial: () => {
    dispatch(resetTrial());
  },
});

export default connect(undefined, mapDispatchToProps)(AppRouterComponent);
