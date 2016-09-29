import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UsecaseTable from '../organisms/table.jsx';
import AddUsecaseButton from '../atoms/button.jsx';
import NewUsecase from '../containers/new-usecase';
import NewUsecaseModal from '../containers/new-usecase-modal';

const Usecases = ({ usecases, onClickAddNewUsecase }) => {
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
      <AddUsecaseButton label="追加" onClick={onClickAddNewUsecase} />
      <UsecaseTable header={header} rows={rows} />
      <NewUsecaseModal>
        <NewUsecase />
      </NewUsecaseModal>
    </div>
  );
};

Usecases.propTypes = {
  usecases: PropTypes.array.isRequired,
  onClickAddNewUsecase: PropTypes.func.isRequired,
};

export default Usecases;
