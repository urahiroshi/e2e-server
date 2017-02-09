import React, { PropTypes } from 'react';

import ComboBox from '../atoms/combo-box.jsx';
import TextBox from '../atoms/text-box.jsx';
import Selectors from '../molecules/selectors.jsx';

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
          onChange('selectors')(null);
          onChange('value')(null);
          onChange('variable')(null);
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
    // TODO: Add escape!
    const children = [typeSelect];
    switch (this.state.type) {
      case 'click':
        children.push(
          ' to ', <Selectors onChange={onChange('selectors')} />
        );
        break;
      case 'input':
      case 'select':
        children.push(
          ' ', <TextBox placeHolder="value" onChange={onChange('value')} />,
          ' to ', <Selectors onChange={onChange('selectors')} />
        );
        break;
      case 'getHtml':
      case 'getText':
        children.push(
          ' from ', <Selectors onChange={onChange('selectors')} />,
          <br />,
          ' ( set variable ',
          <TextBox placeHolder="variable name" onChange={onChange('variable')} />,
          ' )'
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
};

export default ActionInput;
