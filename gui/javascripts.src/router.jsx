import axios from 'axios';
import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Usecases from './views/containers/usecases';
import Usecase from './views/containers/usecase';
import { setUsecases, setUsecase } from './actions/usecases';

const AppRouterComponent = ({
  onEnterUsecases,
  onEnterUsecase,
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
        component: Usecase,
        onEnter: onEnterUsecase,
      },
    ],
  };
  return <Router history={browserHistory} routes={routes} />;
};

AppRouterComponent.propTypes = {
  onEnterUsecases: PropTypes.func.isRequired,
  onEnterUsecase: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onEnterUsecases: () => {
    axios.get('/api/usecases').then((response) => {
      dispatch(setUsecases(response.data));
    });
  },
  onEnterUsecase: ({ params }) => {
    axios.get(`/api/usecases/${params.id}`).then((response) => {
      dispatch(setUsecase(response.data));
    });
  },
});

export default connect(undefined, mapDispatchToProps)(AppRouterComponent);
