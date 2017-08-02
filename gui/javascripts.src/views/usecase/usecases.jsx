import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Usecase from '../usecase/usecase';

const Usecases = ({ usecases, selectedUsecasePath, projectId, iterationNumber }) => {
  if (!usecases) { return <div>Loading...</div>; }
  return (
    <div className="row">
      <div className={(selectedUsecasePath) ? 'col-md-4' : 'col-md-12'} >
        <div className="list-group">
          {
            usecases.map((usecase) =>
              <Link
                key={usecase.usecasePath}
                to={
                  `/projects/${projectId}/iterations/${iterationNumber}` +
                  `/usecases/${usecase.usecasePath}`
                }
                className={
                  (selectedUsecasePath === usecase.usecasePath) ?
                    'list-group-item active' : 'list-group-item'
                }
              >
                <h4 className="list-group-item-heading">{usecase.usecasePath}</h4>
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
      </div>
      {
        (selectedUsecasePath) ?
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
};

Usecases.propTypes = {
  usecases: PropTypes.array,
  selectedUsecasePath: PropTypes.string,
  projectId: PropTypes.number,
  iterationNumber: PropTypes.number,
};

export default Usecases;
