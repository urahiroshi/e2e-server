import { connect } from 'react-redux';
import Usecase from '../templates/usecase.jsx';

const mapStateToProps = (state) => ({
  usecase: state.usecase,
});

const UsecaseContainer = connect(
  mapStateToProps
)(Usecase);

export default UsecaseContainer;
