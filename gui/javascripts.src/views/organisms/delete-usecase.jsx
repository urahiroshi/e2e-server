import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';

const DeleteUsecase = ({
  usecase,
  isLoading,
  onClickDeleteUsecase,
}) => {
  if (isLoading) return <div />;
  const buttonStyle = {
    marginTop: '20px',
  };
  return (
    <div>
      <div>
        Delete <b>{usecase.name}</b> ?
      </div>
      <div style={buttonStyle}>
        <Button
          className="btn btn-danger"
          onClick={() => {
            onClickDeleteUsecase(usecase);
          }}
        >Delete</Button>
      </div>
    </div>
  );
};

DeleteUsecase.propTypes = {
  usecase: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onClickDeleteUsecase: PropTypes.func.isRequired,
};

export default DeleteUsecase;
