import { connect } from 'react-redux';
import Trials from '../organisms/trials.jsx';

const mapStateToProps = (state) => ({
  trials: state.trials,
});

const mapDispatchToProps = () => ({
  onClickStartTrial: (name) => {
    console.warn(`${name} CLICKED, BUT NOT IMPLEMENTED`);
  },
});

const TrialsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trials);

export default TrialsContainer;
