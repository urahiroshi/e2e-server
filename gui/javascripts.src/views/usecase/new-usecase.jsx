import React, { PropTypes } from 'react';

import validateUsecase from '../../validators/usecase';
import Button from '../parts-atom/button.jsx';
import TextBox from '../parts-atom/text-box.jsx';
import VerticalRow from '../parts-molecule/vertical-row.jsx';
import Table from '../parts-molecule/table.jsx';
import Action from '../usecase/action.jsx';
import ActionInput from '../usecase/action-input.jsx';

class NewUsecase extends React.Component {
  constructor(props) {
    super(props);
    const originalActionIndexes = Object.keys(this.props.newUsecase.actions).map(
      (action, index) => index
    );
    this.state = {
      editableActions: [],
      errors: {},
      tempUsecase: JSON.parse(JSON.stringify(this.props.newUsecase)),
      originalActionIndexes,
    };
  }

  onCancel(action, actionIndex) {
    const originalIndex = (
      this.state.originalActionIndexes.map((index) => index)
      .indexOf(actionIndex)
    );
    this.state.tempUsecase.actions[actionIndex] = JSON.parse(
      JSON.stringify(this.props.newUsecase.actions[originalIndex])
    );
    this.setState({
      editableActions: this.state.editableActions.filter(
        (i) => (actionIndex !== i)
      ),
      tempUsecase: this.state.tempUsecase,
    });
  }

  onSend(usecase) {
    const errors = validateUsecase(usecase);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    this.props.onClickSendUsecase(usecase, this.props.usecase);
  }

  addAction() {
    const actionIndex = this.state.tempUsecase.actions.length;
    this.setState({
      editableActions: this.state.editableActions.concat([actionIndex]),
      tempUsecase: Object.assign(
        {},
        this.state.tempUsecase,
        {
          actions: this.state.tempUsecase.actions.concat([{
            type: 'click',
            selectors: [''],
          }]),
        }
      ),
    });
  }

  deleteAction(actionIndex) {
    this.setState({
      tempUsecase: Object.assign(
        {},
        this.state.tempUsecase,
        {
          actions: this.state.tempUsecase.actions.filter(
            (action, i) => (i !== actionIndex)
          ),
        }
      ),
    });
  }

  switchAction(indexBefore, indexAfter) {
    const currentState = this.state.tempUsecase.actions[indexBefore];
    const targetState = this.state.tempUsecase.actions[indexAfter];
    this.state.tempUsecase.actions[indexAfter] = currentState;
    this.state.tempUsecase.actions[indexBefore] = targetState;
    const switchActionIndex = (index) => {
      if (index === indexBefore) { return indexAfter; }
      if (index === indexAfter) { return indexBefore; }
      return index;
    };
    this.setState({
      tempUsecase: this.state.tempUsecase,
      editableActions: this.state.editableActions.map(switchActionIndex),
      originalActionIndexes: this.state.originalActionIndexes.map(switchActionIndex),
    });
  }

  toMoveCell(actionIndex) {
    const arrowStyle = { cursor: 'pointer' };
    return (
      <div>
        { (actionIndex > 0) ?
          <div
            onClick={() => { this.switchAction(actionIndex, actionIndex - 1); }}
            style={arrowStyle}
          >
            ▲
          </div> : <div>&nbsp;</div>
        }
        { (actionIndex < this.state.tempUsecase.actions.length - 1) ?
          <div
            onClick={() => { this.switchAction(actionIndex, actionIndex + 1); }}
            style={arrowStyle}
          >
            ▼
          </div> : <div>&nbsp;</div>
        }
      </div>
    );
  }

  toViewOnlyRow(action, actionIndex) {
    return [
      actionIndex + 1,
      this.toMoveCell(actionIndex),
      <Action action={action} />,
      <Button
        onClick={() => {
          this.setState({
            editableActions: this.state.editableActions.concat([actionIndex]),
          });
        }}
      >Edit</Button>,
      <Button
        onClick={() => {
          this.deleteAction(actionIndex);
        }}
      >Delete</Button>,
    ];
  }

  toEditableRow(action, actionIndex) {
    const cancelableIndex = (
      this.state.originalActionIndexes
      .map((order) => order)
      .indexOf(actionIndex)
    );
    const isCancelable = (cancelableIndex >= 0);
    const errors = (
      this.state.errors.actions && this.state.errors.actions[actionIndex]
    );
    return [
      actionIndex + 1,
      this.toMoveCell(actionIndex),
      <div>
        <div>
          <ActionInput
            // if key is not specified,
            // this may not change when type of props is changed.
            key={isCancelable ? cancelableIndex : undefined}
            action={action}
            onChange={(actionParam) => {
              Object.assign(action, actionParam);
            }}
          />
        </div>
        { (errors) ?
          <div className="error-text">{ JSON.stringify(errors) }</div> : null
        }
      </div>,
      ((isCancelable) ?
        <Button
          onClick={() => {
            this.onCancel(action, actionIndex);
          }}
        >Cancel</Button> : ''
      ),
      <Button
        onClick={() => {
          this.deleteAction(actionIndex);
        }}
      >Delete</Button>,
    ];
  }

  render() {
    if (this.props.isLoading) return <div />;
    const tempUsecase = this.state.tempUsecase;
    const rows = tempUsecase.actions.map((action, i) => {
      if (this.state.editableActions.indexOf(i) >= 0) {
        return this.toEditableRow(action, i);
      }
      return this.toViewOnlyRow(action, i);
    });
    const colStyles = [
      { verticalAlign: 'middle' },
      {},
      { width: '700px' },
      {},
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
                { this.state.errors.name ?
                  <div className="error-text">{ this.state.errors.name }</div> :
                  null
                }
              </VerticalRow>
              <VerticalRow name="URL:">
                <TextBox
                  defaultValue={tempUsecase.url}
                  onChange={(value) => { tempUsecase.url = value; }}
                  placeHolder="url"
                />
                { this.state.errors.url ?
                  <div className="error-text">{ this.state.errors.url }</div> :
                  null
                }
              </VerticalRow>
              <VerticalRow name="Actions:">
                <Table rows={rows} colStyles={colStyles} />
                <div>
                  <Button onClick={() => this.addAction()}>
                  Add Action</Button>
                </div>
              </VerticalRow>
            </tbody>
          </table>
        </div>
        <div>
          <Button
            className="btn btn-primary"
            onClick={() => {
              this.onSend(tempUsecase);
            }}
          >Send</Button>
        </div>
      </div>
    );
  }
}

NewUsecase.propTypes = {
  usecase: PropTypes.object,
  newUsecase: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickSendUsecase: PropTypes.func.isRequired,
};

export default NewUsecase;
