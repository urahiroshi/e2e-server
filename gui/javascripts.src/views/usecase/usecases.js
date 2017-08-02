import { connect } from 'react-redux';
import Usecases from '../usecase/usecases.jsx';

const mapStateToProps = (state) => ({
  usecases: state.iteration && state.iteration.trials,
  selectedUsecasePath: state.usecase && state.usecase.usecasePath,
  projectId: state.project && state.project.id,
  iterationNumber: state.iteration && state.iteration.iterationNumber,
});

const UsecasesContainer = connect(
  mapStateToProps
)(Usecases);

export default UsecasesContainer;
