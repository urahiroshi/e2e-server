import React, { PropTypes } from 'react';

const ActionResult = ({ result, type }) => {
  if (!result || !result.id) { return null; }
  switch (type) {
    case 'getHtml':
      return <pre>{result.html}</pre>;
    case 'getText':
      return <pre>{result.text}</pre>;
    case 'getScreenshot':
      return (
        <div>
          <a
            href={`/images/screenshots/${result.id}.png`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'\u27A1 Show Image'}
          </a>
        </div>
      );
    default:
      break;
  }
  return null;
};

ActionResult.propTypes = {
  result: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default ActionResult;
