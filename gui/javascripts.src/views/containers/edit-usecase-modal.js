import { connect } from 'react-redux';
import Modal from '../templates/modal.jsx';

const mapStateToProps = (state) => ({
  isVisible: state.usecase.isVisible,
});

const EditUsecaseModalContainer = connect(
  mapStateToProps
)(Modal);

export default EditUsecaseModalContainer;
