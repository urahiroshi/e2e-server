import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import Button from '../atoms/button.jsx';
import Table from '../organisms/table.jsx';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const style = {
  table: {},
  tr: {
    verticalAlign: 'top',
    borderTop: '1px #CCCCCC solid',
  },
  th: {
    padding: '10px 10px',
  },
  td: {
    padding: '10px 0px',
  },
};

const Trials = ({ trials, usecaseId, prepareToStartCommand, startCommand }) => {
  const header = ['id', 'state', 'timestamp'];
  const rows = trials.map((trial) => [
    <a href={`/trials/${trial.id}`}>{trial.id}</a>,
    trial.state,
    (new Date(trial.timestamp)).toLocaleString(),
  ]);
  return (
    <section>
      <Heading value="Trials" />
      <Button label="Start Trial" onClick={prepareToStartCommand} />
      <Table header={header} style={style} rows={rows} />
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
  usecaseId: PropTypes.string.isRequired,
  prepareToStartCommand: PropTypes.func.isRequired,
  startCommand: PropTypes.func.isRequired,
};

export default Trials;
