import { connect } from 'react-redux';
import Usecases from '../templates/usecases.jsx';
import { prepareCommand } from '../../actions/command';
import { API_NAME } from '../../consts';

const mapStateToProps = (state) => ({
  usecases: state.usecases,
  selectedUsecaseId: state.usecase.id,
});

const mapDispatchToProps = (dispatch) => ({
  onClickNewUsecaseButton: () => {
    dispatch(prepareCommand(API_NAME.ADD_USECASE));
  },
});

const UsecasesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecases);

export default UsecasesContainer;
