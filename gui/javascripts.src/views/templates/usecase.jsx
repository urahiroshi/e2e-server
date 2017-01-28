import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';
import UsecaseParameters from '../organisms/usecase-parameters.jsx';
import Trials from '../containers/trials';
import Modal from '../containers/modal';
import { API_NAME } from '../../consts';

const Usecase = ({
  usecase,
  onClickEditButton,
  onClickDeleteButton,
  prepareToStartCommand,
  startCommand,
}) => {
  if (!usecase.name) { return <div />; }
  // TODO: Check actions ordered by action.order value
  const timestamp = (new Date(usecase.createdAt)).toLocaleString();
  return (
    <div>
      <div>
        <Button
          className="btn btn-primary"
          onClick={prepareToStartCommand}
          style={{ marginRight: '10px' }}
        >
          <span className="glyphicon glyphicon-play-circle" />
          {' Start Trial'}
        </Button>
        <Button
          className="btn btn-warning"
          onClick={() => { onClickEditButton(usecase); }}
          style={{ marginRight: '10px' }}
        >
          <span className="glyphicon glyphicon-edit" />
          {' Edit'}
        </Button>
        <Button
          className="btn btn-danger"
          onClick={onClickDeleteButton}
        >
          <span className="glyphicon glyphicon-minus-sign" />
          {' Delete'}
        </Button>
      </div>
      <h2 style={{ paddingBottom: '10px' }}>
        {usecase.name}<small>{` created at ${timestamp}`}</small>
      </h2>
      <UsecaseParameters
        url={usecase.url}
        actions={usecase.actions}
      />
      <Modal name={API_NAME.ADD_TRIAL} title="Start Trial">
        <div>
          <div>Start Trial, OK ?</div>
          <div style={{ marginTop: '20px' }}>
            <Button
              className="btn btn-primary"
              onClick={() => {
                startCommand(usecase.id);
              }}
            >Start</Button>
          </div>
        </div>
      </Modal>
      <Trials />
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
  prepareToStartCommand: PropTypes.func.isRequired,
  startCommand: PropTypes.func.isRequired,
};

export default Usecase;
