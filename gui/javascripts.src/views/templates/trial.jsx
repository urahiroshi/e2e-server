import React, { PropTypes } from 'react';

import UsecaseParameters from '../organisms/usecase-parameters.jsx';

const Trial = ({ trial, results, selected }) => {
  if (!trial.state) { return null; }
  const updatedAt = (new Date(trial.updatedAt)).toLocaleString();
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
  const heading = `${icon} ${trial.state} at ${updatedAt}`;
  return (
    (selected) ?
      <div>
        <div>{heading}</div>
        <UsecaseParameters
          url={trial.usecase.url}
          actions={trial.usecase.actions}
          results={results}
        />
      </div> :
      <div>{heading}</div>
  );
};

Trial.propTypes = {
  trial: PropTypes.object.isRequired,
  results: PropTypes.array,
  selected: PropTypes.bool.isRequired,
};

export default Trial;
