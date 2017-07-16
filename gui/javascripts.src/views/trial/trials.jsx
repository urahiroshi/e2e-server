import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import Trial from '../trial/trial.jsx';

const Trials = ({
  trials,
  selectedTrial,
  projectId,
  iterationNumber,
  usecasePath,
  results,
}) => {
  if (!trials) { return <section />; }
  return (
    <section>
      <h3>Trials</h3>
      <div className="list-group">
        {
          trials.map((trial) => {
            if (selectedTrial && selectedTrial.id === trial.id) {
              const selectedResults = results && results.filter((result) => (
                result.trialId === selectedTrial.id
              ));
              return (
                <div className="list-group-item" key={trial.id}>
                  <Trial trial={selectedTrial} results={selectedResults} selected />
                </div>
              );
            }
            return (
              <Link
                key={trial.id}
                className="list-group-item"
                to={
                  `/projects/${projectId}/iterations/${iterationNumber}` +
                  `/usecases/${usecasePath}?trialId=${trial.id}`
                }
              >
                <Trial trial={trial} selected={false} />
              </Link>
            );
          })
        }
      </div>
    </section>
  );
};

Trials.propTypes = {
  trials: PropTypes.array,
  selectedTrial: PropTypes.object,
  projectId: PropTypes.number,
  iterationNumber: PropTypes.number,
  usecasePath: PropTypes.string,
  results: PropTypes.array,
};

export default Trials;
