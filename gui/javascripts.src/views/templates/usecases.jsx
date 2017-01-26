import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Usecase from '../containers/usecase';
import NewUsecase from '../containers/new-usecase';
import EditUsecase from '../containers/edit-usecase';
import DeleteUsecase from '../containers/delete-usecase';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const Usecases = ({ usecases, selectedUsecaseId, onClickNewUsecaseButton }) => (
  <div className="row">
    <div className={(selectedUsecaseId) ? 'col-md-4' : 'col-md-12'} >
      <h2 className={{ color: '#777777' }}>Usecases</h2>
      <div style={{ 'text-align': 'right', 'padding-bottom': '10px' }}>
        <button
          className="btn btn-success"
          onClick={onClickNewUsecaseButton}
          style={{ 'font-weight': 'bold' }}
        >
          <span className="glyphicon glyphicon-plus-sign" />
          {' Add'}
        </button>
      </div>
      <div className="list-group">
        {
          usecases.map((usecase) =>
            <Link
              key={usecase.id}
              to={`/usecases/${usecase.id}`}
              className={
                (selectedUsecaseId === usecase.id) ?
                  'list-group-item active' : 'list-group-item'
              }
            >
              <h4 className="list-group-item-heading">{usecase.name}</h4>
              <p className="list-group-item-text">
                created at {(new Date(usecase.createdAt)).toLocaleString()}
              </p>
            </Link>
          )
        }
      </div>
      <Modal name={API_NAME.ADD_USECASE} title="New Usecase">
        <NewUsecase />
      </Modal>
      <Modal name={API_NAME.MODIFY_USECASE} title="Edit Usecase">
        <EditUsecase />
      </Modal>
      <Modal name={API_NAME.DELETE_USECASE} title="Delete Usecase">
        <DeleteUsecase />
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
