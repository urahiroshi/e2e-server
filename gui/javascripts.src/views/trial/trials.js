import { connect } from 'react-redux';
import Trials from '../trial/trials.jsx';

const mapStateToProps = (state) => ({
  trials: state.trials,
  usecaseId: state.usecase.id,
  selectedTrialId: (state.trial) ? state.trial.id : null,
  results: state.results,
});

const TrialsContainer = connect(
  mapStateToProps
)(Trials);

export default TrialsContainer;
