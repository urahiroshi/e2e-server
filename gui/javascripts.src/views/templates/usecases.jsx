import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UsecaseTable from '../organisms/table.jsx';
import AddUsecaseButton from '../atoms/button.jsx';
import NewUsecase from '../containers/new-usecase';
import Modal from '../containers/modal';

const Usecases = ({ usecases, onClickShowModal }) => {
  const newUsecaseModalName = 'newUsecaseModal';
  const header = [
    'ID', 'Usecase', 'Create Date Time',
  ];
  const rows = usecases.map((usecase) =>
    [
      <Link to={`/usecases/${usecase.id}`}>{usecase.id}</Link>,
      usecase.name,
      usecase.createDt,
    ]
  );
  return (
    <div>
      <AddUsecaseButton
        label="Add"
        onClick={
          () => { onClickShowModal(newUsecaseModalName); }
        }
      />
      <UsecaseTable header={header} rows={rows} />
      <Modal
        name={newUsecaseModalName}
        title="New Usecase"
      >
        <NewUsecase />
      </Modal>
    </div>
  );
};

Usecases.propTypes = {
  usecases: PropTypes.array.isRequired,
  onClickShowModal: PropTypes.func.isRequired,
};

export default Usecases;
