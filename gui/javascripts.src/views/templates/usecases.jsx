import React, { PropTypes } from 'react';
import UsecaseTable from '../organisms/table.jsx';
import AddUsecaseButton from '../atoms/button.jsx';

const Usecases = ({ usecases }) => {
  const header = [
    'ID', 'Usecase', 'Create Date Time',
  ];
  const rows = usecases.map((usecase) =>
    [
      usecase.id,
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
