import React, { PropTypes } from 'react';

import Parameters from '../organisms/parameters.jsx';
import Result from '../containers/result';

const Trial = ({
  trial,
}) => {
  if (!trial.id) { return <div />; }
  const keyValues = {
    Id: trial.id,
    State: trial.state,
    Timestamp: (new Date(trial.timestamp)).toLocaleString(),
    Usecase: (
      <a href={`/usecases/${trial.usecaseId}`}>
      {`${trial.usecaseId} (${trial.data.name})`}
      </a>
    ),
    URL: trial.data.url,
    Actions: {
      header: ['Order', 'Selector', 'Type', 'Param'],
      rows: trial.data.actions.map((action, index) => (
        [
          index + 1,
          action.selector,
          action.type,
          action.param,
        ]
      )),
    },
  };
  return (
    <div>
      <Parameters keyValues={keyValues} />
      <Result />
    </div>
  );
};

Trial.propTypes = {
  trial: PropTypes.object.isRequired,
};

export default Trial;
