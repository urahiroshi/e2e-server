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
        Remove {usecase.id}{usecase.name ? `(${usecase.name})` : ''} ?
      </div>
      <div style={buttonStyle}>
        <Button
          label="OK"
          onClick={() => {
            onClickDeleteUsecase(usecase);
          }}
        />
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
