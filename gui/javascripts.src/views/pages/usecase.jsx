import React, { PropTypes } from 'react';
import querystring from 'querystring';
import Usecases from '../usecase/usecases';

class UsecasePage extends React.Component {
  constructor(props) {
    super(props);
    this._fetch(props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.location !== nextProps.location) {
      this._fetch(nextProps);
    }
  }

  _getTrialId({ location }) {
    if (location.search[0] !== '?') { return undefined; }
    const query = querystring.parse(location.search.slice(1));
    return query.trialId;
  }

  _fetch({
    match,
    location,
    currentProjectId,
    currentIterationNumber,
    lastFetchIterationAt,
    currentUsecasePath,
    lastFetchUsecaseAt,
    currentTrialId,
    lastFetchTrialAt,
    lastFetchResultsAt,
    startGetProject,
    startGetIteration,
    startGetUsecase,
    startGetTrial,
    startGetResults,
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
    if (
      currentUsecasePath !== match.params.usecasePath ||
      now - lastFetchUsecaseAt > 30000
    ) {
      const projectId = match.params.projectId;
      const iterationNumber = match.params.iterationNumber;
      const usecasePath = match.params.usecasePath;
      startGetUsecase(projectId, usecasePath, iterationNumber);
    }
    const nextTrialId = this._getTrialId({ location });
    if (
      nextTrialId &&
      (
        currentTrialId !== nextTrialId ||
        now - lastFetchTrialAt > 30000
      )
    ) {
      startGetTrial(nextTrialId);
    }
    if (
      nextTrialId &&
      (
        currentTrialId !== nextTrialId ||
        now - lastFetchResultsAt > 30000
      )
    ) {
      startGetResults(nextTrialId);
    }
  }

  render() {
    return <Usecases />;
  }
}

UsecasePage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  currentProjectId: PropTypes.number,
  currentIterationNumber: PropTypes.number,
  lastFetchIterationAt: PropTypes.number,
  currentUsecasePath: PropTypes.string,
  lastFetchUsecaseAt: PropTypes.number,
  trialId: PropTypes.number,
  lastFetchTrialAt: PropTypes.number,
  lastFetchResultsAt: PropTypes.number,
  startGetProject: PropTypes.func.isRequired,
  startGetIteration: PropTypes.func.isRequired,
  startGetUsecase: PropTypes.func.isRequired,
  startGetTrial: PropTypes.func.isRequired,
  startGetResults: PropTypes.func.isRequired,
};

export default UsecasePage;
