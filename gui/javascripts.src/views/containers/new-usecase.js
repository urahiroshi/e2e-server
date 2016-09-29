import { connect } from 'react-redux';
import NewUsecase from '../organisms/new-usecase.jsx';
import { setNewUsecase } from '../../actions/new-usecase';
import { addUsecaseStart } from '../../actions/usecases';

const mapStateToProps = (state) => ({
  newUsecase: state.newUsecase,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAddAction: (action, usecase) => {
    if (!(action.selector && action.type)) {
      return;
    }
    usecase.actions.push(action);
    dispatch(setNewUsecase(usecase));
  },
  onClickDeleteAction: (index, usecase) => {
    usecase.actions.splice(index, 1);
    dispatch(setNewUsecase(usecase));
  },
  onClickSendNewUsecase: (usecase) => {
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
