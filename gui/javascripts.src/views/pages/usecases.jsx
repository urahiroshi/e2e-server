import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import UsecasesContainer from '../containers/usecases';
import Reducers from '../../reducers';
import { setUsecases } from '../../actions/usecases';

const store = createStore(Reducers);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <UsecasesContainer />
    </Provider>
    , document.getElementById('content')
  );
}

render();
axios.get('/api/usecases').then((response) => {
  store.dispatch(setUsecases(response.data));
});
