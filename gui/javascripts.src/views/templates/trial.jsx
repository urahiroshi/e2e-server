import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import UsecaseParameters from '../organisms/usecase-parameters.jsx';
import Result from '../containers/result';

const Trial = ({
  trial,
}) => {
  if (!trial.id) { return <div />; }
  const timestamp = (new Date(trial.timestamp)).toLocaleString();
  return (
    <div>
      <Heading value={`${trial.data.name} ${trial.state} at ${timestamp}`} />
      <UsecaseParameters url={trial.data.url} actions={trial.data.actions} />
      <Result />
    </div>
  );
};

Trial.propTypes = {
  trial: PropTypes.object.isRequired,
};

export default Trial;
