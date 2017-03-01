import { connect } from 'react-redux';
import Modal from '../layouts/modal.jsx';
import { endCommand } from '../../actions/command';
import { COMMAND_STATE } from '../../consts';

const mapStateToProps = (state) => ({
  isVisible: (actionName) => {
    if (!state.command[actionName]) { return false; }
    const commandState = state.command[actionName].state;
    return (
      commandState === COMMAND_STATE.PREPARED ||
      commandState === COMMAND_STATE.REQUESTED ||
      commandState === COMMAND_STATE.SUCCEEDED ||
      commandState === COMMAND_STATE.FAILED
    );
  },
  getContent: (actionName) => {
    if (!state.command[actionName]) { return null; }
    const commandState = state.command[actionName].state;
    switch (commandState) {
      case COMMAND_STATE.REQUESTED:
        return 'Sending request ...';
      case COMMAND_STATE.SUCCEEDED:
        return 'Success to send request.';
      case COMMAND_STATE.FAILED:
        return 'Fail to send request.';
      default:
        return null;
    }
  },
});

const mapDispatchToProps = (dispatch) => ({
  onClickCloseButton: (actionName) => {
    dispatch(endCommand(actionName));
  },
});

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;
