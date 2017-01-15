import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';
import Action from '../atoms/action.jsx';
import ActionResult from '../atoms/action-result.jsx';

const UsecaseParameters = ({ url, actions, result, onClickEdit, onClickDelete }) =>
  <div>
    <ul>
      <li>
        URL: {url}
      </li>
      <li>
        Actions:
        <ol>
          {
            actions.map((action, i) =>
              <li key={i}>
                <Action action={action} />
                <ActionResult result={result} type={action.type} name={action.name} />
              </li>
            )
          }
        </ol>
      </li>
    </ul>
    { (onClickEdit) ?
      <Button label="edit" onClick={onClickEdit} /> : ''
    }
    { (onClickDelete) ?
      <Button label="delete" onClick={onClickDelete} /> : ''
    }
  </div>;

UsecaseParameters.propTypes = {
  url: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired,
  result: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default UsecaseParameters;
