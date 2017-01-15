import React, { PropTypes } from 'react';

const ActionResult = ({ result, type, name }) => {
  if (!result || !result.resultId) { return null; }
  let resultObj;
  switch (type) {
    case 'getHtml':
      resultObj = result.htmls.find(html => html.name === name);
      if (resultObj) { return <code>{resultObj.html}</code>; }
      break;
    case 'getText':
      resultObj = result.texts.find(text => text.name === name);
      if (resultObj) { return <code>{resultObj.txt}</code>; }
      break;
    case 'getScreenshot':
      resultObj = result.screenshots.find(screenshot => screenshot.name === name);
      if (resultObj) {
        return (
          <div>
            <a href={`/images/results/${result.resultId}/screenshots/${resultObj.name}.png`}>
            Image
            </a>
          </div>
        );
      }
      break;
    default:
      break;
  }
  return null;
};

ActionResult.propTypes = {
  result: PropTypes.object,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default ActionResult;
