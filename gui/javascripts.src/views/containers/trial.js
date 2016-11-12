import { connect } from 'react-redux';
import Trial from '../templates/trial.jsx';

const mapStateToProps = (state) => ({
  trial: state.trial,
});

const TrialContainer = connect(
  mapStateToProps
)(Trial);

export default TrialContainer;
