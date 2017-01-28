import React, { PropTypes } from 'react';

import UsecaseParameters from '../organisms/usecase-parameters.jsx';
import Trials from '../containers/trials';

const Usecase = ({
  usecase,
  onClickEditButton,
  onClickDeleteButton,
}) => {
  if (!usecase.name) { return <div />; }
  // TODO: Check actions ordered by action.order value
  const timestamp = (new Date(usecase.createdAt)).toLocaleString();
  return (
    <div>
      <div>
        <button
          className="btn btn-warning"
          onClick={() => { onClickEditButton(usecase); }}
          style={{ 'margin-right': '10px', 'font-weight': 'bold' }}
        >
          <span className="glyphicon glyphicon-edit" />
          {' Edit'}
        </button>
        <button
          className="btn btn-danger"
          onClick={onClickDeleteButton}
          style={{ 'font-weight': 'bold' }}
        >
          <span className="glyphicon glyphicon-minus-sign" />
          {' Delete'}
        </button>
      </div>
      <h2 style={{ 'padding-bottom': '10px' }}>
        {usecase.name}<small>{` created at ${timestamp}`}</small>
      </h2>
      <UsecaseParameters
        url={usecase.url}
        actions={usecase.actions}
      />
      <Trials />
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
};

export default Usecase;
