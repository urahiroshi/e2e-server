import React, { PropTypes } from 'react';

import Action from '../atoms/action.jsx';
import Button from '../atoms/button.jsx';
import TextBox from '../atoms/text-box.jsx';
import ActionInput from '../molecules/action-input.jsx';
import VerticalRow from '../molecules/vertical-row.jsx';
import Table from '../organisms/table.jsx';

const NewUsecase = ({
  usecase,
  newUsecase,
  isLoading,
  onClickAddAction,
  onClickDeleteAction,
  onClickSendUsecase,
}) => {
  if (isLoading) return <div />;
  const tempUsecase = Object.assign({}, newUsecase);
  const rows = newUsecase.actions.map((action, i) => [
    i + 1,
    <Action action={action} />,
    <Button
      onClick={() => {
        onClickDeleteAction(i, tempUsecase);
      }}
    >Delete</Button>,
  ]);
  const newAction = {};
  rows.push([
    newUsecase.actions.length + 1,
    <ActionInput
      onChange={(actionParam) => {
        Object.assign(newAction, actionParam);
      }}
    />,
    <Button
      onClick={() => {
        onClickAddAction(newAction, tempUsecase);
      }}
    >Add</Button>,
  ]);
  const colStyles = [
    {},
    { width: '700px' },
    {},
  ];
  return (
    <div>
      <div>
        <table style={{ fontSize: '16px' }}>
          <tbody className="form-inline">
            <VerticalRow name="Name:">
              <TextBox
                defaultValue={tempUsecase.name}
                onChange={(value) => { tempUsecase.name = value; }}
                placeHolder="name"
              />
            </VerticalRow>
            <VerticalRow name="URL:">
              <TextBox
                defaultValue={tempUsecase.url}
                onChange={(value) => { tempUsecase.url = value; }}
                placeHolder="url"
              />
            </VerticalRow>
            <VerticalRow name="Actions:">
              <Table rows={rows} colStyles={colStyles} />
            </VerticalRow>
          </tbody>
        </table>
      </div>
      <div>
        <Button
          className="btn btn-primary"
          onClick={() => {
            onClickSendUsecase(tempUsecase, usecase);
          }}
        >Send</Button>
      </div>
    </div>
  );
};

NewUsecase.propTypes = {
  usecase: PropTypes.object,
  newUsecase: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickAddAction: PropTypes.func.isRequired,
  onClickDeleteAction: PropTypes.func.isRequired,
  onClickSendUsecase: PropTypes.func.isRequired,
};

export default NewUsecase;
