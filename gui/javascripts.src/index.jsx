import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import Reducers from './reducers';
import Sagas from './sagas';
import Usecases from './views/containers/usecases';
import Usecase from './views/containers/usecase';
import { setUsecases, setUsecase } from './actions/usecases';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(Sagas);

const routes = {
  path: '/',
  indexRoute: {
    component: Usecases,
    onEnter: () => {
      axios.get('/api/usecases').then((response) => {
        store.dispatch(setUsecases(response.data));
      });
    },
  },
  childRoutes: [
    {
      path: 'usecases',
      component: Usecases,
      onEnter: () => {
        axios.get('/api/usecases').then((response) => {
          store.dispatch(setUsecases(response.data));
        });
      },
    },
    {
      path: 'usecases/:id',
      component: Usecase,
      onEnter: ({ params }) => {
        axios.get(`/api/usecases/${params.id}`).then((response) => {
          store.dispatch(setUsecase(response.data));
        });
      },
    },
  ],
};

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.getElementById('content')
  );
}

render();
