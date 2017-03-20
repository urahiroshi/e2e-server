import React, { PropTypes } from 'react';

import ComboBox from '../parts-atom/combo-box.jsx';
import TextBox from '../parts-atom/text-box.jsx';
import Selectors from '../parts-molecule/selectors.jsx';

class ActionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: this.props.action.type };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ type: nextProps.action.type });
    return true;
  }

  onChange(key) {
    return (value) => {
      this.props.onChange({ [key]: value });
    };
  }

  selectors() {
    return (
      <Selectors
        defaultValue={this.props.action.selectors}
        onChange={this.onChange('selectors')}
      />
    );
  }

  value() {
    return (
      <TextBox
        defaultValue={this.props.action.value}
        placeHolder="value"
        onChange={this.onChange('value')}
      />
    );
  }

  variable() {
    return (
      <TextBox
        defaultValue={this.props.action.variable}
        placeHolder="variable name"
        onChange={this.onChange('variable')}
      />
    );
  }

  render() {
    const typeSelect = (
      <ComboBox
        // // if key is not specified,
        // // this combo-box may not change when type of props is changed.
        // key={this.props.action.type}
        onChange={(value) => {
          this.setState({ type: value });
          this.onChange('selectors')(null);
          this.onChange('value')(null);
          this.onChange('variable')(null);
          this.onChange('type')(value);
        }}
        selections={{
          click: 'click',
          input: 'input',
          select: 'select',
          getHtml: 'getHtml',
          getText: 'getText',
          getScreenshot: 'getScreenshot',
        }}
        selected={this.state.type}
      />
    );
    const children = [typeSelect];
    switch (this.state.type) {
      case 'click':
        children.push(
          ' to ', this.selectors()
        );
        break;
      case 'input':
      case 'select':
        children.push(
          ' ', this.value(),
          ' to ', this.selectors()
        );
        break;
      case 'getHtml':
      case 'getText':
        children.push(
          ' from ', this.selectors(),
          <br />,
          ' ( set variable ', this.variable(), ' )'
        );
        break;
      case 'getScreenshot':
      default:
        break;
    }
    return React.createElement('div', null, ...children);
  }
}

ActionInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  action: PropTypes.object,
};

export default ActionInput;
