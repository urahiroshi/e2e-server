import { connect } from 'react-redux';
import TrialPage from '../pages/trial.jsx';
import { startGetTrialCommand } from '../../actions/trial';
import { startGetResultsCommand } from '../../actions/results';

const mapStateToProps = (state) => ({
  trial: state.trial,
  results: state.results,
});

const mapDispatchToProps = (dispatch) => ({
  startGetTrial: (trialId) => {
    dispatch(startGetTrialCommand(trialId));
  },
  startGetResults: (trialId) => {
    dispatch(startGetResultsCommand(trialId));
  },
});

const TrialPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialPage);

export default TrialPageContainer;
