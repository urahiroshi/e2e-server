import { connect } from 'react-redux';
import Trials from '../trial/trials.jsx';

const mapStateToProps = (state) => ({
  trials: state.usecase && state.usecase.trials,
  selectedTrial: state.trial,
  projectId: state.project && state.project.id,
  iterationNumber: state.iteration && state.iteration.iterationNumber,
  usecasePath: state.usecase && state.usecase.usecasePath,
  results: state.results,
});

const TrialsContainer = connect(
  mapStateToProps
)(Trials);

export default TrialsContainer;
