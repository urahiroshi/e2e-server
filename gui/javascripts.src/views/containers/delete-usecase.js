import { connect } from 'react-redux';
import DeleteUsecase from '../organisms/delete-usecase.jsx';
import { startDeleteUsecaseCommand } from '../../actions/usecases';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
  isLoading: state.usecase.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onClickDeleteUsecase: (usecase) => {
    dispatch(startDeleteUsecaseCommand(usecase));
  },
});

const DeleteUsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUsecase);

export default DeleteUsecaseContainer;
