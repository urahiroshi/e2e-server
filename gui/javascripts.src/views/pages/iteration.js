import { connect } from 'react-redux';
import IterationPage from '../pages/iteration.jsx';
import { startGetProjectCommand } from '../../actions/project';
import { startGetIterationCommand } from '../../actions/iteration';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  currentProjectId: state.project && state.project.id,
  currentIterationNumber: state.iteration && state.iteration.iterationNumber,
  lastFetchIterationAt: (
    state.command[API_NAME.GET_ITERATION] &&
    state.command[API_NAME.GET_ITERATION].succeededAt
  ),
  // project: state.project,
  // projectNeedUpdate: !state.project,
  // iteration: state.iteration,
  // iterationNeedUpdate: (
  //   !state.iteration ||
  //   (Date.now() - state.command[API_NAME.GET_ITERATION].succeededAt > 30000)
  // ),
});

const mapDispatchToProps = (dispatch) => ({
  startGetProject: (projectId) => {
    dispatch(startGetProjectCommand(projectId));
  },
  startGetIteration: (projectId, iterationNumber) => {
    dispatch(startGetIterationCommand(projectId, iterationNumber));
  },
});

const IterationPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IterationPage);

export default IterationPageContainer;
