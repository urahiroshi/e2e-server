import React, { PropTypes } from 'react';
import Usecases from '../usecase/usecases';

class IterationPage extends React.Component {
  constructor(props) {
    super(props);
    this._fetch(props);
  }

  componentWillUpdate(nextProps) {
    if (
      JSON.stringify(this.props.match.params) !==
      JSON.stringify(nextProps.match.params)
    ) {
      this._fetch(nextProps);
    }
  }

  _fetch({
    match,
    currentProjectId,
    currentIterationNumber,
    lastFetchIterationAt,
    startGetProject,
    startGetIteration,
  }) {
    const now = Date.now();
    if (currentProjectId !== match.params.projectId) {
      const projectId = match.params.projectId;
      startGetProject(projectId);
    }
    if (
      currentIterationNumber !== match.params.iterationNumber ||
      now - lastFetchIterationAt > 30000
    ) {
      const projectId = match.params.projectId;
      const iterationNumber = match.params.iterationNumber;
      startGetIteration(projectId, iterationNumber);
    }
  }

  render() {
    return <Usecases />;
  }
}

IterationPage.propTypes = {
  match: PropTypes.object.isRequired,
  currentProjectId: PropTypes.number,
  currentIterationNumber: PropTypes.number,
  lastFetchIterationAt: PropTypes.number,
  startGetProject: PropTypes.func.isRequired,
  startGetIteration: PropTypes.func.isRequired,
};

export default IterationPage;
