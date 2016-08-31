import { connect } from 'react-redux';
import Usecases from '../templates/usecases.jsx';

const mapStateToProps = (state) => ({
  usecases: state.usecases,
});

const UsecasesContainer = connect(
  mapStateToProps
)(Usecases);

export default UsecasesContainer;
