import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UsecaseTable from '../organisms/table.jsx';
import AddUsecaseButton from '../atoms/button.jsx';
import NewUsecase from '../containers/new-usecase';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const Usecases = ({ usecases, onClickNewUsecaseButton }) => {
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
        onClick={onClickNewUsecaseButton}
      />
      <UsecaseTable header={header} rows={rows} />
      <Modal
        name={API_NAME.ADD_USECASE}
        title="New Usecase"
      >
        <NewUsecase />
      </Modal>
    </div>
  );
};

Usecases.propTypes = {
  usecases: PropTypes.array.isRequired,
  onClickNewUsecaseButton: PropTypes.func.isRequired,
};

export default Usecases;
