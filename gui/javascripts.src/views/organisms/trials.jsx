import React, { PropTypes } from 'react';

import Trial from '../templates/trial.jsx';

const Trials = ({
  trials,
  usecaseId,
  selectedTrialId,
}) => {
  if (usecaseId == undefined) { return <section />; }
  return (
    <section>
      <h3>Trials</h3>
      <div className="list-group">
        {
          trials.map((trial) => (
            (trial.id === selectedTrialId) ?
              <div className="list-group-item" key={trial.id}>
                <Trial trial={trial} selected />
              </div> :
              <a
                key={trial.id}
                className="list-group-item"
                href={`/usecases/${usecaseId}/trials/${trial.id}`}
              >
                <Trial trial={trial} selected={false} />
              </a>
          ))
        }
      </div>
    </section>
  );
};

Trials.propTypes = {
  trials: PropTypes.array.isRequired,
  usecaseId: PropTypes.number,
  selectedTrialId: PropTypes.number,
};

export default Trials;
