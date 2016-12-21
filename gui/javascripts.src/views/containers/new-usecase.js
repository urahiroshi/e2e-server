import { connect } from 'react-redux';
import NewUsecase from '../organisms/new-usecase.jsx';
import { setNewUsecase } from '../../actions/new-usecase';
import { addUsecaseStart } from '../../actions/usecases';
import { API_STATE } from '../../consts';

const mapStateToProps = (state) => {
  let message = null;
  switch (state.api.addUsecase.state) {
    case API_STATE.REQUESTED:
      message = 'Sending Request...';
      break;
    case API_STATE.SUCCEEDED:
      message = 'New usecase has been added.';
      break;
    case API_STATE.FAILED:
      message = state.api.addUsecase.error;
      break;
    default:
      break;
  }
  return {
    newUsecase: state.newUsecase,
    isLoading: false,
    message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClickAddAction: (action, usecase) => {
    if (!action.type) {
      console.warn(`NO VALUE: selector: ${action.selector}, type: ${action.type}`);
      return;
    }
    usecase.actions.push(action);
    dispatch(setNewUsecase(usecase));
  },
  onClickDeleteAction: (index, usecase) => {
    usecase.actions.splice(index, 1);
    dispatch(setNewUsecase(usecase));
  },
  onClickSendUsecase: (usecase) => {
    if (!usecase.url) {
      // TODO: Add Error Action
      console.log('NO URL');
      return;
    }
    if (!usecase.actions || usecase.actions.length === 0) {
      // TODO: Add Error Action
      console.log('NO ACTIONS');
      return;
    }
    dispatch(addUsecaseStart(usecase));
  },
});

const NewUsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUsecase);

export default NewUsecaseContainer;
