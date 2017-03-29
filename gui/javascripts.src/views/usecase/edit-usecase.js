import { connect } from 'react-redux';
import NewUsecase from '../usecase/new-usecase.jsx';
import { setNewUsecase } from '../../actions/new-usecase';
import { startModifyUsecaseCommand } from '../../actions/usecases';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
  newUsecase: state.newUsecase,
  isLoading: state.newUsecase.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAddAction: (action, newUsecase) => {
    if (!action.type) {
      console.warn(`NO VALUE: selectors: ${action.selectors}, type: ${action.type}`);
      return;
    }
    newUsecase.actions.push(action);
    dispatch(setNewUsecase(newUsecase));
  },
  onClickDeleteAction: (index, newUsecase) => {
    newUsecase.actions.splice(index, 1);
    dispatch(setNewUsecase(newUsecase));
  },
  onClickSendUsecase: (newUsecase, usecase) => {
    dispatch(startModifyUsecaseCommand(usecase, newUsecase));
  },
});

const NewUsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUsecase);

export default NewUsecaseContainer;
