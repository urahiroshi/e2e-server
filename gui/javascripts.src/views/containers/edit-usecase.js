import { connect } from 'react-redux';
import NewUsecase from '../organisms/new-usecase.jsx';
import { setNewUsecase } from '../../actions/new-usecase';
import { modifyUsecaseStart } from '../../actions/usecases';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
  newUsecase: state.newUsecase,
  isLoading: state.newUsecase.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAddAction: (action, newUsecase) => {
    if (!action.type) {
      console.warn(`NO VALUE: selector: ${action.selector}, type: ${action.type}`);
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
    if (!newUsecase.url) {
      // TODO: Add Error Action
      console.log('NO URL');
      return;
    }
    if (!newUsecase.actions || newUsecase.actions.length === 0) {
      // TODO: Add Error Action
      console.log('NO ACTIONS');
      return;
    }
    dispatch(modifyUsecaseStart(usecase, newUsecase));
  },
});

const NewUsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUsecase);

export default NewUsecaseContainer;
