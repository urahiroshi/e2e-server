import axios from 'axios';
import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Usecases from './views/containers/usecases';
import Usecase from './views/containers/usecase';
import Trial from './views/containers/trial';
import { setUsecases, setUsecase } from './actions/usecases';
import { setNewUsecase, resetNewUsecase } from './actions/new-usecase';
import { setTrials, setTrial, resetTrial } from './actions/trials';
import { setResult, resetResult } from './actions/results';

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
        path: 'trials/:id',
        component: Trial,
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

const mapDispatchToProps = (dispatch) => ({
  onEnterUsecases: () => {
    axios.get('/api/usecases').then((response) => {
      dispatch(setUsecases(response.data));
    });
  },
  onLeaveUsecases: () => {
    dispatch(resetNewUsecase());
  },
  onEnterUsecase: ({ params }) => {
    axios.get(`/api/usecases/${params.id}`).then((response) => {
      dispatch(setUsecase(response.data));
      dispatch(setNewUsecase(response.data));
    });
    axios.get(`/api/trials?usecaseId=${params.id}&length=10`).then((response) => {
      dispatch(setTrials(response.data));
    });
  },
  onLeaveUsecase: () => {
    dispatch(resetNewUsecase());
  },
  onEnterTrial: ({ params }) => {
    axios.get(`/api/trials/${params.id}`).then((response) => {
      dispatch(setTrial(response.data));
    });
    axios.get(`/api/results?jobId=${params.id}`).then((response) => {
      dispatch(setResult(response.data));
    });
  },
  onLeaveTrial: () => {
    dispatch(resetTrial());
    dispatch(resetResult());
  },
});

export default connect(undefined, mapDispatchToProps)(AppRouterComponent);
