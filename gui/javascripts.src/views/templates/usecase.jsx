import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import UsecaseParameters from '../organisms/usecase-parameters.jsx';
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
  if (!usecase.name) { return <div />; }
  // TODO: Add Heading to created at time
  // TODO; Check actions ordered by action.order value
  return (
    <div>
      <Heading value={`${usecase.name}`} />
      <UsecaseParameters
        url={usecase.url}
        actions={usecase.actions}
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
