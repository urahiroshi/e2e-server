import { connect } from 'react-redux';
import Result from '../organisms/result.jsx';

const mapStateToProps = (state) => ({
  result: state.result,
});

const ResultContainer = connect(
  mapStateToProps
)(Result);

export default ResultContainer;
