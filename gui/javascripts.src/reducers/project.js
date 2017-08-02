import {
  SET_PROJECT,
} from '../actions/project';

const project = (state = null, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;
    default:
      return state;
  }
};

export default project;
