import React, { PropTypes } from 'react';

const Action = ({ action }) => {
  const nodes = [];
  let selector;
  // TODO: Add escape!
  if (action.selectors) {
    selector = `[${action.selectors.join(', ')}]`;
  }
  switch (action.type) {
    case 'click':
      nodes.push(`${action.type} to ${selector}`);
      break;
    case 'input':
    case 'select':
      nodes.push(`${action.type} ${action.value} to ${selector}`);
      break;
    case 'getHtml':
    case 'getText':
      nodes.push(`${action.type} labeled by ${action.name} from ${selector}`);
      break;
    case 'getScreenshot':
      nodes.push(`${action.type} labeled by ${action.name}`);
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
