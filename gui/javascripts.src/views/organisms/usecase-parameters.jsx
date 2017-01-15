import React, { PropTypes } from 'react';

import Button from '../atoms/button.jsx';
import Action from '../atoms/action.jsx';

const UsecaseParameters = ({ url, actions, onClickEdit, onClickDelete }) =>
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
              <li key={i}><Action action={action} /></li>
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
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default UsecaseParameters;
