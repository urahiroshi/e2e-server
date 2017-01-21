import React, { PropTypes } from 'react';

import UsecaseParameters from '../organisms/usecase-parameters.jsx';

const Trial = ({ trial, selected }) => {
  if (!trial.id) { return null; }
  const timestamp = (new Date(trial.timestamp)).toLocaleString();
  const heading = `${trial.data.name} ${trial.state} at ${timestamp}`;
  return (
    (selected) ?
      <div>
        <div>{heading}</div>
        <UsecaseParameters
          url={trial.data.url}
          actions={trial.data.actions}
          result={trial.result}
        />
      </div> :
      <div>{heading}</div>
  );
};

Trial.propTypes = {
  trial: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Trial;
