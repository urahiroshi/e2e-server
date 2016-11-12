import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import Button from '../atoms/button.jsx';
import Table from '../organisms/table.jsx';
import Modal from '../containers/modal';

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

const Trials = ({ trials, usecaseId, onClickShowModal, onClickStartTrial }) => {
  const header = ['id', 'state', 'timestamp'];
  const rows = trials.map((trial) => [
    <a href={`/trials/${trial.id}`}>{trial.id}</a>,
    trial.state,
    (new Date(trial.timestamp)).toLocaleString(),
  ]);
  const startTrialModalName = 'startTrialModal';
  return (
    <section>
      <Heading value="Trials" />
      <Button label="Start Trial" onClick={onClickShowModal(startTrialModalName)} />
      <Table header={header} style={style} rows={rows} />
      <Modal name={startTrialModalName} title="Start Trial">
        <div>
          <div>Start Trial, OK ?</div>
          <div>
            <Button
              label="Start"
              onClick={() => {
                onClickStartTrial(usecaseId);
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
  onClickShowModal: PropTypes.func.isRequired,
  onClickStartTrial: PropTypes.func.isRequired,
};

export default Trials;
