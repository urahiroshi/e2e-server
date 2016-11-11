import { connect } from 'react-redux';
import Trials from '../organisms/trials.jsx';
import { showModal } from '../../actions/modal';
import { startTrial } from '../../actions/trials';

const mapStateToProps = (state) => ({
  trials: state.trials,
  usecaseId: state.usecase.id || '',
});

const mapDispatchToProps = (dispatch) => ({
  onClickShowModal: (name) => (
    () => {
      dispatch(showModal(name));
    }
  ),
  onClickStartTrial: (usecaseId) => {
    dispatch(startTrial(usecaseId));
  },
});

const TrialsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trials);

export default TrialsContainer;
