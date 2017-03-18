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
    this.state = {
      editableActions: [],
      newActions: [],
      errors: {},
      tempUsecase: JSON.parse(JSON.stringify(this.props.newUsecase)),
    };
  }

  onCancel(action, actionIndex) {
    this.state.tempUsecase.actions[actionIndex] = JSON.parse(
      JSON.stringify(this.props.newUsecase.actions[actionIndex])
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
      newActions: this.state.newActions.concat([actionIndex]),
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

  toViewOnlyRow(action, actionIndex) {
    return [
      actionIndex + 1,
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
    const isCancelable = (this.state.newActions.indexOf(actionIndex) < 0);
    const errors = (
      this.state.errors.actions && this.state.errors.actions[actionIndex]
    );
    return [
      actionIndex + 1,
      <div>
        <div>
          <ActionInput
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
