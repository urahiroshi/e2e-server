import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
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
if (window.Models && window.Models.Usecases) {
  store.dispatch(setUsecases(window.Models.Usecases));
}
