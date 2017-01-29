import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from '../atoms/button.jsx';
import Usecase from '../containers/usecase';
import NewUsecase from '../containers/new-usecase';
import EditUsecase from '../containers/edit-usecase';
import DeleteUsecase from '../containers/delete-usecase';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const Usecases = ({ usecases, selectedUsecaseId, onClickNewUsecaseButton }) => (
  <div className="row">
    <div className={(selectedUsecaseId) ? 'col-md-4' : 'col-md-12'} >
      <div style={{ paddingBottom: '10px' }}>
        <Button
          className="btn btn-success"
          onClick={onClickNewUsecaseButton}
        >
          <span className="glyphicon glyphicon-plus-sign" />
          {' Add Usecase'}
        </Button>
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
                {(usecase.createdAt) ?
                  `created at ${(new Date(usecase.createdAt)).toLocaleString()}` :
                  ''
                }
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
        <div
          className="col-md-8"
          style={{
            border: 'solid #337ab7 8px',
            borderRadius: '20px/20px',
            padding: '30px',
            fontSize: '16px',
          }}
        >
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
