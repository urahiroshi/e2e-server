import { connect } from 'react-redux';
import Modal from '../templates/modal.jsx';

const mapStateToProps = (state) => ({
  isVisible: state.newUsecase.isVisible,
});

const NewUsecaseModalContainer = connect(
  mapStateToProps
)(Modal);

export default NewUsecaseModalContainer;
