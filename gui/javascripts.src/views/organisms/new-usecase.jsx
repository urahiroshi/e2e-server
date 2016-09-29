import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';
import TextBox from '../atoms/text-box.jsx';
import Heading from '../atoms/heading.jsx';
import VerticalRow from '../molecules/vertical-row.jsx';
import Table from '../organisms/table.jsx';

const NewUsecase = ({
  newUsecase,
  onClickAddAction,
  onClickDeleteAction,
  onClickSendNewUsecase,
}) => {
  const header = ['Order', 'Selector', 'Type', 'param', 'Add/Delete'];
  let newSelector;
  let newType;
  let newParam;
  const usecase = Object.assign({}, newUsecase);
  const rows = newUsecase.actions.map((action, i) => [
    i + 1,
    action.selector,
    action.type,
    action.param,
    <Button
      label="Delete"
      onClick={() => {
        onClickDeleteAction(i, usecase);
      }}
    />,
  ]);
  rows.push([
    newUsecase.actions.length + 1,
    <TextBox onChange={(value) => { newSelector = value; }} />,
    <TextBox onChange={(value) => { newType = value; }} />,
    <TextBox onChange={(value) => { newParam = value; }} />,
    <Button
      label="Add"
      onClick={() => {
        onClickAddAction(
          {
            selector: newSelector,
            type: newType,
            param: newParam,
          },
          usecase
        );
      }}
    />,
  ]);
  return (
    <div>
      <div>
        <Heading value="Parameters" />
        <table>
          <tbody>
            <VerticalRow name="Name">
              <TextBox onChange={(value) => { usecase.name = value; }} />
            </VerticalRow>
            <VerticalRow name="URL">
              <TextBox onChange={(value) => { usecase.url = value; }} />
            </VerticalRow>
            <VerticalRow name="Actions">
              <Table header={header} rows={rows} />
            </VerticalRow>
          </tbody>
        </table>
      </div>
      <div>
        <Button
          label="Send"
          onClick={() => {
            onClickSendNewUsecase(usecase);
          }}
        />
      </div>
    </div>
  );
};

NewUsecase.propTypes = {
  newUsecase: PropTypes.object.isRequired,
  onClickAddAction: PropTypes.func.isRequired,
  onClickDeleteAction: PropTypes.func.isRequired,
  onClickSendNewUsecase: PropTypes.func.isRequired,
};

export default NewUsecase;
