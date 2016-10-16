import React, { PropTypes } from 'react';

const TextBox = ({ onChange, defaultValue }) => (
  <input
    type="text"
    className="form-control"
    defaultValue={defaultValue}
    onChange={(event) => {
      const value = event.target.value.trim();
      onChange(value);
    }}
  />
);

// class TextBox extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: props.defaultValue };
//     this.onChange = (event) => {
//       const value = event.target.value.trim();
//       this.setState({ value });
//       props.onChange(value);
//     };
//   }

//   render() {
//     return (
//       <input
//         type="text"
//         className="form-control"
//         value={this.state.value}
//         onChange={this.onChange}
//       />
//     );
//   }
// }

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default TextBox;
