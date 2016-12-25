import { connect } from 'react-redux';
import Usecase from '../templates/usecase.jsx';
import { prepareCommand } from '../../actions/command';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
});

const mapDispatchToProps = (dispatch) => ({
  onClickEditButton: () => {
    dispatch(prepareCommand(API_NAME.MODIFY_USECASE));
  },
  onClickDeleteButton: () => {
    dispatch(prepareCommand(API_NAME.DELETE_USECASE));
  },
});

const UsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecase);

export default UsecaseContainer;
