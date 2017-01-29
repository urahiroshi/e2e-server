import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Trial from '../templates/trial.jsx';

const Trials = ({
  trials,
  usecaseId,
  selectedTrialId,
  result,
}) => {
  if (usecaseId == undefined) { return <section />; }
  return (
    <section>
      <h3>Trials</h3>
      <div className="list-group">
        {
          trials.map((trial) => {
            if (trial.id === selectedTrialId) {
              let selectedResult;
              if (result && result.trialId === trial.id) {
                selectedResult = result;
              }
              return (
                <div className="list-group-item" key={trial.id}>
                  <Trial trial={trial} result={selectedResult} selected />
                </div>
              );
            }
            return (
              <Link
                key={trial.id}
                className="list-group-item"
                to={`/usecases/${usecaseId}/trials/${trial.id}`}
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
  trials: PropTypes.array.isRequired,
  usecaseId: PropTypes.number,
  selectedTrialId: PropTypes.number,
  result: PropTypes.object,
};

export default Trials;
