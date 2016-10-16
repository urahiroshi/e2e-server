import React, { PropTypes } from 'react';

import Parameters from '../organisms/parameters.jsx';
import EditUsecase from '../containers/edit-usecase';
import Modal from '../containers/modal';

const Usecase = ({
  usecase,
  onClickShowModal,
}) => {
  const editUsecaseModalName = 'editUsecaseModal';
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
      <Parameters
        keyValues={keyValues}
        onClickEdit={
          () => { onClickShowModal(editUsecaseModalName); }
        }
      />
      <Modal
        name={editUsecaseModalName}
        title="Edit Usecase"
      >
        <EditUsecase />
      </Modal>
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
};

export default Usecase;
