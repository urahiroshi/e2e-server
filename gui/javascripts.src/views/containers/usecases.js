import { connect } from 'react-redux';
import Usecases from '../templates/usecases.jsx';
import { showNewUsecase } from '../../actions/new-usecase';

const mapStateToProps = (state) => ({
  usecases: state.usecases,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAddNewUsecase: () => {
    dispatch(showNewUsecase());
  },
});

const UsecasesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecases);

export default UsecasesContainer;
