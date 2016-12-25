import { connect } from 'react-redux';
import NewUsecase from '../organisms/new-usecase.jsx';
import { setNewUsecase } from '../../actions/new-usecase';
import { startAddUsecaseCommand } from '../../actions/usecases';

const mapStateToProps = (state) => (
  {
    newUsecase: state.newUsecase,
    isLoading: false,
  }
);

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
    dispatch(startAddUsecaseCommand(usecase));
  },
});

const NewUsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUsecase);

export default NewUsecaseContainer;
