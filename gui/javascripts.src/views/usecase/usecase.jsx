import React, { PropTypes } from 'react';

import Trials from '../trial/trials';

const Usecase = ({
  usecase,
}) => {
  if (!usecase.usecasePath) { return <div />; }
  return (
    <div>
      <h2 style={{ paddingBottom: '10px' }}>
        {usecase.usecasePath}
      </h2>
      <Trials />
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
};

export default Usecase;
