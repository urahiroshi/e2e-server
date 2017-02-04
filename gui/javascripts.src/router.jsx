import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Usecases from './views/containers/usecases';
import { startGetUsecasesCommand } from './actions/usecases';
import { resetTrial, startGetTrialsCommand } from './actions/trials';
import { startGetResultsCommand } from './actions/results';

const AppRouterComponent = ({
  onEnterUsecases,
  onEnterUsecase,
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
      },
      {
        path: 'usecases/:id',
        component: Usecases,
        onEnter: onEnterUsecase,
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
  onEnterUsecase: PropTypes.func.isRequired,
  onEnterTrial: PropTypes.func.isRequired,
  onLeaveTrial: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onEnterUsecases: () => {
    dispatch(startGetUsecasesCommand());
  },
  onEnterUsecase: ({ params }) => {
    const usecaseId = Number(params.id);
    dispatch(startGetUsecasesCommand(usecaseId));
    dispatch(startGetTrialsCommand(usecaseId, 10));
  },
  onEnterTrial: ({ params }) => {
    const usecaseId = Number(params.usecaseId);
    const trialId = Number(params.trialId);
    dispatch(startGetUsecasesCommand(usecaseId));
    dispatch(startGetTrialsCommand(usecaseId, 10, trialId));
    dispatch(startGetResultsCommand(trialId));
  },
  onLeaveTrial: () => {
    dispatch(resetTrial());
  },
});

export default connect(undefined, mapDispatchToProps)(AppRouterComponent);
