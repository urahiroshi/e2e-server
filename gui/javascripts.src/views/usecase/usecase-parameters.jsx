import React, { PropTypes } from 'react';

import Action from '../usecase/action.jsx';
import ActionResult from '../usecase/action-result.jsx';

const UsecaseParameters = ({ url, actions, results }) =>
  <div>
    <ul>
      <li>
        URL: {url}
      </li>
      <li>
        Actions:
        <ol>
          {
            actions.map((action, i) => {
              const result = results && results[i];
              return (
                <li key={i}>
                  <Action action={action} completed={!!result} />
                  <ActionResult result={result} type={action.type} />
                </li>
              );
            })
          }
        </ol>
      </li>
    </ul>
  </div>;

UsecaseParameters.propTypes = {
  url: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired,
  results: PropTypes.array,
};

export default UsecaseParameters;
