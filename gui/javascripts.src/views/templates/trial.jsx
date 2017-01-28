import React, { PropTypes } from 'react';

import UsecaseParameters from '../organisms/usecase-parameters.jsx';

const Trial = ({ trial, selected }) => {
  if (!trial.id) { return null; }
  const timestamp = (new Date(trial.timestamp)).toLocaleString();
  let icon = '';
  switch (trial.state) {
    case 'completed':
      icon = '\u2714';
      break;
    case 'failed':
      icon = '\u2716';
      break;
    default:
      icon = '\u231b';
      break;
  }
  const heading = `${icon} ${trial.state} at ${timestamp}`;
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
