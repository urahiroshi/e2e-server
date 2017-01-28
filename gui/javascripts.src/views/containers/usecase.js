import { connect } from 'react-redux';
import Usecase from '../templates/usecase.jsx';
import { prepareCommand } from '../../actions/command';
import { setNewUsecase } from '../../actions/new-usecase';
import { startAddTrialCommand } from '../../actions/trials';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
});

const mapDispatchToProps = (dispatch) => ({
  onClickEditButton: (usecase) => {
    dispatch(setNewUsecase(usecase));
    dispatch(prepareCommand(API_NAME.MODIFY_USECASE));
  },
  onClickDeleteButton: () => {
    dispatch(prepareCommand(API_NAME.DELETE_USECASE));
  },
  prepareToStartCommand: () => {
    dispatch(prepareCommand(API_NAME.ADD_TRIAL));
  },
  startCommand: (usecaseId) => {
    dispatch(startAddTrialCommand(usecaseId));
  },
});

const UsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecase);

export default UsecaseContainer;
