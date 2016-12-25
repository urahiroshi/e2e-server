import React, { PropTypes } from 'react';

import Parameters from '../organisms/parameters.jsx';
import EditUsecase from '../containers/edit-usecase';
import DeleteUsecase from '../containers/delete-usecase';
import Modal from '../containers/modal';
import Trials from '../containers/trials';
import { API_NAME } from '../../consts';

const Usecase = ({
  usecase,
  onClickEditButton,
  onClickDeleteButton,
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
      <Parameters
        keyValues={keyValues}
        onClickEdit={onClickEditButton}
        onClickDelete={onClickDeleteButton}
      />
      <Trials />
      <Modal name={API_NAME.MODIFY_USECASE} title="Edit Usecase">
        <EditUsecase />
      </Modal>
      <Modal name={API_NAME.DELETE_USECASE} title="Delete Usecase">
        <DeleteUsecase />
      </Modal>
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
};

export default Usecase;
