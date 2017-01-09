import { connect } from 'react-redux';
import Trials from '../organisms/trials.jsx';
import { prepareCommand } from '../../actions/command';
import { startAddTrialCommand } from '../../actions/trials';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  trials: state.trials,
  usecaseId: state.usecase.id,
});

const mapDispatchToProps = (dispatch) => ({
  prepareToStartCommand: () => {
    dispatch(prepareCommand(API_NAME.ADD_TRIAL));
  },
  startCommand: (usecaseId) => {
    dispatch(startAddTrialCommand(usecaseId));
  },
});

const TrialsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trials);

export default TrialsContainer;
