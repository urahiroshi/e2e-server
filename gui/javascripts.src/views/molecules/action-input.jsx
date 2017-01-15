import React, { PropTypes } from 'react';

import ComboBox from '../atoms/combo-box.jsx';
import TextBox from '../atoms/text-box.jsx';

class ActionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: 'click' };
    this.props.onChange({ type: 'click' });
  }

  render() {
    const onChange = (key) => (
      (value) => {
        this.props.onChange({ [key]: value });
      }
    );
    const typeSelect = (
      <ComboBox
        onChange={(value) => {
          this.setState({ type: value });
          onChange('type')(value);
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
    const selectorsInput = (
      <TextBox onChange={(value) => { onChange('selectors')([value]); }} />
    );
    // TODO: Add escape!
    const children = [typeSelect];
    switch (this.state.type) {
      case 'click':
        children.push(
          ' to ', selectorsInput
        );
        break;
      case 'input':
      case 'select':
        children.push(
          ' ', <TextBox onChange={onChange('value')} />,
          ' to ', selectorsInput
        );
        break;
      case 'getHtml':
      case 'getText':
        children.push(
          ' labeled by ', <TextBox onChange={onChange('name')} />,
          ' from ', selectorsInput
        );
        break;
      case 'getScreenshot':
        children.push(
          ' labeled by ', <TextBox onChange={onChange('name')} />
        );
        break;
      default:
        break;
    }
    return React.createElement('div', null, ...children);
  }
}

ActionInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ActionInput;
