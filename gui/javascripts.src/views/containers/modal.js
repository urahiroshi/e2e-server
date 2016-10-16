import { connect } from 'react-redux';
import Modal from '../templates/modal.jsx';
import { hideModal } from '../../actions/modal';

const mapStateToProps = (state) => ({
  modalState: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: (name) => {
    dispatch(hideModal(name));
  },
});

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;
