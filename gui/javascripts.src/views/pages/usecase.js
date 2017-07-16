import { connect } from 'react-redux';
import UsecasePage from '../pages/usecase.jsx';
import { startGetProjectCommand } from '../../actions/project';
import { startGetIterationCommand } from '../../actions/iteration';
import { startGetUsecaseCommand } from '../../actions/usecase';
import { startGetTrialCommand } from '../../actions/trial';
import { startGetResultsCommand } from '../../actions/results';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  currentProjectId: state.project && state.project.id,
  currentIterationNumber: state.iteration && state.iteration.iterationNumber,
  lastFetchIterationAt: (
    state.command[API_NAME.GET_ITERATION] &&
    state.command[API_NAME.GET_ITERATION].succeededAt
  ),
  currentUsecasePath: state.usecase && state.usecase.usecasePath,
  lastFetchUsecaseAt: (
    state.command[API_NAME.GET_USECASE] &&
    state.command[API_NAME.GET_USECASE].succeededAt
  ),
  currentTrialId: state.trial && state.trial.id,
  lastFetchTrialAt: (
    state.command[API_NAME.GET_TRIAL] &&
    state.command[API_NAME.GET_TRIAL].succeededAt
  ),
  lastFetchResultsAt: (
    state.command[API_NAME.GET_RESULTS] &&
    state.command[API_NAME.GET_RESULTS].succeededAt
  ),
});

const mapDispatchToProps = (dispatch) => ({
  startGetProject: (projectId) => {
    dispatch(startGetProjectCommand(projectId));
  },
  startGetIteration: (projectId, iterationNumber) => {
    dispatch(startGetIterationCommand(projectId, iterationNumber));
  },
  startGetUsecase: (projectId, usecasePath, iterationNumber) => {
    dispatch(
      startGetUsecaseCommand(
        projectId,
        usecasePath,
        { lastIterationNumber: iterationNumber }
      )
    );
  },
  startGetTrial: (trialId) => {
    dispatch(startGetTrialCommand(trialId));
  },
  startGetResults: (trialId) => {
    dispatch(startGetResultsCommand(trialId));
  },
});

const UsecasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsecasePage);

export default UsecasePageContainer;
