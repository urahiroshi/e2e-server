import { connect } from 'react-redux';
import Usecases from '../usecase/usecases.jsx';
import { prepareCommand } from '../../actions/command';
import { resetNewUsecase } from '../../actions/new-usecase';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  usecases: state.usecases,
  selectedUsecaseId: state.usecase.id,
});

const mapDispatchToProps = (dispatch) => ({
  onClickNewUsecaseButton: () => {
    dispatch(resetNewUsecase());
    dispatch(prepareCommand(API_NAME.ADD_USECASE));
  },
});

const UsecasesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecases);

export default UsecasesContainer;
