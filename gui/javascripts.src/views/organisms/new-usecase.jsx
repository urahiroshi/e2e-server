import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';
import TextBox from '../atoms/text-box.jsx';
import ComboBox from '../atoms/combo-box.jsx';
import Heading from '../atoms/heading.jsx';
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
  const header = ['Order', 'Selector', 'Type', 'param', 'Add/Delete'];
  let newSelector;
  let newType = 'click';
  let newParam;
  const tempUsecase = Object.assign({}, newUsecase);
  const rows = newUsecase.actions.map((action, i) => [
    i + 1,
    action.selector,
    action.type,
    action.param,
    <Button
      label="Delete"
      onClick={() => {
        onClickDeleteAction(i, tempUsecase);
      }}
    />,
  ]);
  rows.push([
    newUsecase.actions.length + 1,
    <TextBox onChange={(value) => { newSelector = value; }} />,
    <ComboBox
      onChange={(value) => { newType = value; }}
      selections={{
        click: 'click',
        input: 'input',
        select: 'select',
        getHtml: 'getHtml',
        getText: 'getText',
        getScreenshot: 'getScreenshot',
      }}
      selected={newType}
    />,
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
          tempUsecase
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
              <TextBox
                defaultValue={tempUsecase.name}
                onChange={(value) => { tempUsecase.name = value; }}
              />
            </VerticalRow>
            <VerticalRow name="URL">
              <TextBox
                defaultValue={tempUsecase.url}
                onChange={(value) => { tempUsecase.url = value; }}
              />
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
            onClickSendUsecase(tempUsecase, usecase);
          }}
        />
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
