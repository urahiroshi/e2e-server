import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';
import Trial from '../templates/trial.jsx';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const Trials = ({
  trials,
  usecaseId,
  selectedTrialId,
  prepareToStartCommand,
  startCommand,
}) => {
  if (usecaseId == undefined) { return <section />; }
  return (
    <section>
      <button
        className="btn btn-primary"
        onClick={prepareToStartCommand}
        style={{ fontWeight: 'bold' }}
      >
        <span className="glyphicon glyphicon-play-circle" />
        {' Start Trial'}
      </button>
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
      <Modal name={API_NAME.ADD_TRIAL} title="Start Trial">
        <div>
          <div>Start Trial, OK ?</div>
          <div style={{ marginTop: '20px' }}>
            <Button
              className="btn btn-primary"
              onClick={() => {
                startCommand(usecaseId);
              }}
            >Start</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

Trials.propTypes = {
  trials: PropTypes.array.isRequired,
  usecaseId: PropTypes.number,
  selectedTrialId: PropTypes.number,
  prepareToStartCommand: PropTypes.func.isRequired,
  startCommand: PropTypes.func.isRequired,
};

export default Trials;
