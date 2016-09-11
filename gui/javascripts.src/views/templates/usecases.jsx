import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UsecaseTable from '../organisms/table.jsx';
import AddUsecaseButton from '../atoms/button.jsx';

const Usecases = ({ usecases }) => {
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
      <AddUsecaseButton label="追加" />
      <UsecaseTable header={header} rows={rows} />
    </div>
  );
};

Usecases.propTypes = {
  usecases: PropTypes.array.isRequired,
};

export default Usecases;
