import { connect } from 'react-redux';
import Usecase from '../templates/usecase.jsx';
import { showEditUsecase, hideEditUsecase } from '../../actions/usecase';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
});

const mapDispatchToProps = (dispatch) => ({
  onClickStartEditUsecase: () => {
    dispatch(showEditUsecase());
  },
  onClickCloseEditUsecase: () => {
    dispatch(hideEditUsecase());
  },
});

const UsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecase);

export default UsecaseContainer;
