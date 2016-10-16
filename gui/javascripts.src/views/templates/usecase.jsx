import React, { PropTypes } from 'react';

import Parameters from '../organisms/parameters.jsx';
import EditUsecase from '../containers/edit-usecase';
import EditUsecaseModal from '../containers/edit-usecase-modal';

const Usecase = ({
  usecase,
  onClickStartEditUsecase,
  onClickCloseEditUsecase,
}) => {
  const keyValues = {
    Id: usecase.id,
    Name: usecase.name,
    URL: usecase.url,
    Actions: usecase.actions ? {
      header: ['Order', 'Selector', 'Type', 'Param'],
      rows: usecase.actions.map((action, index) => (
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
      <Parameters keyValues={keyValues} onClickEdit={onClickStartEditUsecase} />
      <EditUsecaseModal
        onClose={onClickCloseEditUsecase}
        title="Edit Usecase"
      >
        <EditUsecase />
      </EditUsecaseModal>
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickStartEditUsecase: PropTypes.func.isRequired,
  onClickCloseEditUsecase: PropTypes.func.isRequired,
};

export default Usecase;
