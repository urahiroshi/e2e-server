import React, { PropTypes } from 'react';
import _ from 'lodash';

import Parameters from '../organisms/parameters.jsx';

const Usecase = ({ usecase }) => {
  const keyValues = {
    Id: usecase.key,
    Name: usecase.name,
    URL: usecase.params ? usecase.params.url : undefined,
    Actions: usecase.params ? {
      header: ['Order', 'Selector', 'Type', 'Param'],
      rows: _.map(usecase.params.actions, (action, index) => (
        [
          index + 1,
          action.selector,
          action.type,
          action.param,
        ]
      )),
    } : undefined,
  };
  return (
    <div>
      <Parameters keyValues={keyValues} />
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
};

export default Usecase;
