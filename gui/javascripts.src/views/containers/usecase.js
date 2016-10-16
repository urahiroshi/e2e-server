import { connect } from 'react-redux';
import Usecase from '../templates/usecase.jsx';
import { showModal } from '../../actions/modal';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
});

const mapDispatchToProps = (dispatch) => ({
  onClickShowModal: (name) => {
    dispatch(showModal(name));
  },
});

const UsecaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecase);

export default UsecaseContainer;
