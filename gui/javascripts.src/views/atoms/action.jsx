import React, { PropTypes } from 'react';

const Action = ({ action, completed }) => {
  const nodes = [];
  let selector;
  // TODO: Add escape!
  if (action.selectors) {
    selector = action.selectors.map((s, i) => (
      <code key={i}>{s}</code>
    ));
  }
  const stateAndType = completed ? `\u2714 ${action.type}` : action.type;
  switch (action.type) {
    case 'click':
      nodes.push(`${stateAndType} to `, selector);
      break;
    case 'input':
    case 'select':
      nodes.push(
        `${stateAndType} `, <kbd>{action.value}</kbd>, ' to ', selector
      );
      break;
    case 'getHtml':
    case 'getText':
      nodes.push(stateAndType, ' from ', selector);
      if (action.variable) {
        nodes.push(', set variable ', <b>{action.variable}</b>);
      }
      break;
    case 'getScreenshot':
      nodes.push(stateAndType);
      break;
    default:
      break;
  }
  return React.createElement('div', null, ...nodes);
};

Action.propTypes = {
  action: PropTypes.object.isRequired,
  completed: PropTypes.bool,
};

export default Action;
