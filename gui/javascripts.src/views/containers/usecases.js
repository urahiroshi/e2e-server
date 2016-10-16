import { connect } from 'react-redux';
import Usecases from '../templates/usecases.jsx';
import { showModal } from '../../actions/modal';

const mapStateToProps = (state) => ({
  usecases: state.usecases,
});

const mapDispatchToProps = (dispatch) => ({
  onClickShowModal: (name) => {
    dispatch(showModal(name));
  },
});

const UsecasesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Usecases);

export default UsecasesContainer;
