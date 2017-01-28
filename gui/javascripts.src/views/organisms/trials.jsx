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
        style={{ 'font-weight': 'bold' }}
      >
        <span className="glyphicon glyphicon-play-circle" />
        {' Start Trial'}
      </button>
      <h3>Trials</h3>
      <ul>
        {
          trials.map((trial) =>
            <li key={trial.id}>
              {
                (trial.id === selectedTrialId) ?
                  <Trial trial={trial} selected /> :
                  <a href={`/usecases/${usecaseId}/trials/${trial.id}`}>
                    <Trial trial={trial} selected={false} />
                  </a>
              }
            </li>
          )
        }
      </ul>
      <Modal name={API_NAME.ADD_TRIAL} title="Start Trial">
        <div>
          <div>Start Trial, OK ?</div>
          <div>
            <Button
              label="Start"
              onClick={() => {
                startCommand(usecaseId);
              }}
            />
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
