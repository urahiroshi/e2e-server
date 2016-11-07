import React, { PropTypes } from 'react';

import Parameters from '../organisms/parameters.jsx';
import EditUsecase from '../containers/edit-usecase';
import DeleteUsecase from '../containers/delete-usecase';
import Modal from '../containers/modal';
import Trials from '../containers/trials';

const Usecase = ({
  usecase,
  onClickShowModal,
}) => {
  const editUsecaseModalName = 'editUsecaseModal';
  const deleteUsecaseModalName = 'deleteUsecaseModal';
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
        onClickDelete={
          () => { onClickShowModal(deleteUsecaseModalName); }
        }
      />
      <Trials />
      <Modal name={editUsecaseModalName} title="Edit Usecase">
        <EditUsecase />
      </Modal>
      <Modal name={deleteUsecaseModalName} title="Delete Usecase">
        <DeleteUsecase />
      </Modal>
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
};

export default Usecase;
