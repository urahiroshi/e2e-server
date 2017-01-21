import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AddUsecaseButton from '../atoms/button.jsx';
import Usecase from '../containers/usecase';
import NewUsecase from '../containers/new-usecase';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const Usecases = ({ usecases, selectedUsecaseId, onClickNewUsecaseButton }) => (
  <div className="row">
    <div className={(selectedUsecaseId) ? 'col-md-4' : 'col-md-12'} >
      <AddUsecaseButton
        label="Add"
        onClick={onClickNewUsecaseButton}
      />
      <ul>
        {
          usecases.map((usecase) =>
            <li key={usecase.id}>
              <Link to={`/usecases/${usecase.id}`}>{usecase.name}</Link>
              <span> {(new Date(usecase.createdAt)).toLocaleString()}</span>
            </li>
          )
        }
      </ul>
      <Modal
        name={API_NAME.ADD_USECASE}
        title="New Usecase"
      >
        <NewUsecase />
      </Modal>
    </div>
    {
      (selectedUsecaseId) ?
        <div className="col-md-8">
          <Usecase />
        </div> : null
    }
  </div>
);

Usecases.propTypes = {
  usecases: PropTypes.array.isRequired,
  selectedUsecaseId: PropTypes.number,
  onClickNewUsecaseButton: PropTypes.func.isRequired,
};

export default Usecases;
