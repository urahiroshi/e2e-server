import React, { PropTypes } from 'react';

import TextBox from '../parts-atom/text-box.jsx';

class Selectors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectors: [''] };
  }

  render() {
    const selectors = this.state.selectors.slice();
    this.props.onChange(selectors);
    const selectorsInput = selectors.map((selector, i) =>
      <div
        className="input-group"
        key={`${selector}-${i}`}
        style={{ marginRight: '5px' }}
      >
        <TextBox
          defaultValue={selector}
          onChange={(value) => {
            selectors[i] = value;
            this.props.onChange(selectors);
          }}
          placeHolder="selector"
        />
        <div
          className="input-group-addon"
          onClick={() => {
            if (selectors.length > 1) {
              selectors.splice(i, 1);
              this.setState({ selectors });
            }
          }}
        >-</div>
      </div>
    );
    selectorsInput.push(
      <button
        className="btn btn-secondary"
        key={selectors.length}
        onClick={() => {
          selectors.push('');
          this.setState({ selectors });
        }}
      >+</button>
    );
    return <div className="input-group">{selectorsInput}</div>;
  }
}

Selectors.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Selectors;
