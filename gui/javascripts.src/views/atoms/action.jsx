import React, { PropTypes } from 'react';

const Action = ({ action }) => {
  let explanation;
  let selector;
  // TODO: Add escape!
  if (action.selectors) {
    selector = `[${action.selectors.join(', ')}]`;
  }
  switch (action.type) {
    case 'click':
      explanation = `${action.type} to ${selector}`;
      break;
    case 'input':
    case 'select':
      explanation = `${action.type} ${action.value} to ${selector}`;
      break;
    case 'getHtml':
    case 'getText':
      explanation = `${action.type} labeled by ${action.name} from ${selector}`;
      break;
    case 'getScreenshot':
      explanation = `${action.type} labeled by ${action.name}`;
      break;
    default:
      break;
  }
  return <span>{explanation}</span>;
};

Action.propTypes = {
  action: PropTypes.object.isRequired,
};

export default Action;
