import React, { PropTypes } from 'react';
import Trial from '../trial/trial.jsx';

class TrialPage extends React.Component {
  constructor(props) {
    super(props);
    this._fetch(props);
  }

  _fetch({
    match,
    startGetTrial,
    startGetResults,
  }) {
    const trialId = match.params.trialId;
    startGetTrial(trialId);
    startGetResults(trialId);
  }

  render() {
    if (!this.props.trial) { return <div />; }
    return (
      <Trial
        trial={this.props.trial}
        results={this.props.results}
        selected
      />
    );
  }
}

TrialPage.propTypes = {
  match: PropTypes.object.isRequired,
  trial: PropTypes.object,
  results: PropTypes.array,
  startGetTrial: PropTypes.func.isRequired,
  startGetResults: PropTypes.func.isRequired,
};

export default TrialPage;
