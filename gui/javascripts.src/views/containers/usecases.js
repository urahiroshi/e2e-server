import { connect } from 'react-redux';
import Usecases from '../templates/usecases.jsx';
import { showNewUsecase, hideNewUsecase } from '../../actions/new-usecase';

const mapStateToProps = (state) => ({
  usecases: state.usecases,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAddNewUsecase: () => {
    dispatch(showNewUsecase());
  },
  onClickCloseNewUsecase: () => {
    dispatch(hideNewUsecase());
  },
});

const UsecasesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecases);

export default UsecasesContainer;
