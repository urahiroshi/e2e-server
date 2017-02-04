import React, { PropTypes } from 'react';

const Action = ({ action }) => {
  const nodes = [];
  let selector;
  // TODO: Add escape!
  if (action.selectors) {
    selector = action.selectors.map((s, i) => (
      <code key={i}>{s}</code>
    ));
  }
  switch (action.type) {
    case 'click':
      nodes.push(`${action.type} to `, selector);
      break;
    case 'input':
    case 'select':
      nodes.push(`${action.type} `, <kbd>{action.value}</kbd>, ' to ', selector);
      break;
    case 'getHtml':
    case 'getText':
      nodes.push(action.type, ' from ', selector);
      break;
    case 'getScreenshot':
      nodes.push(action.type);
      break;
    default:
      break;
  }
  return React.createElement('div', null, ...nodes);
};

Action.propTypes = {
  action: PropTypes.object.isRequired,
};

export default Action;
