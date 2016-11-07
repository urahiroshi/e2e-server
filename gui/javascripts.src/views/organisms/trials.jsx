import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import Button from '../atoms/button.jsx';
import Table from '../organisms/table.jsx';

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

const Trials = ({ trials, onClickStartTrial }) => {
  const header = ['id', 'state', 'timestamp'];
  const rows = trials.map((trial) => [
    trial.id, trial.state, (new Date(trial.timestamp)).toLocaleString(),
  ]);
  return (
    <section>
      <Heading value="Trials" />
      <Button label="Start Trial" onClick={onClickStartTrial} />
      <Table header={header} style={style} rows={rows} />
    </section>
  );
};

Trials.propTypes = {
  trials: PropTypes.array.isRequired,
  onClickStartTrial: PropTypes.func.isRequired,
};

export default Trials;
