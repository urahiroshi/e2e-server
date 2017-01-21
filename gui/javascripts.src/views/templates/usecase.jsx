import React, { PropTypes } from 'react';

import Heading from '../atoms/heading.jsx';
import UsecaseParameters from '../organisms/usecase-parameters.jsx';
import Trials from '../containers/trials';

const Usecase = ({
  usecase,
  onClickEditButton,
  onClickDeleteButton,
}) => {
  if (!usecase.name) { return <div />; }
  // TODO: Check actions ordered by action.order value
  const timestamp = (new Date(usecase.createdAt)).toLocaleString();
  return (
    <div>
      <Heading value={`${usecase.name} created at ${timestamp}`} />
      <UsecaseParameters
        url={usecase.url}
        actions={usecase.actions}
        onClickEdit={() => { onClickEditButton(usecase); }}
        onClickDelete={onClickDeleteButton}
      />
      <Trials />
    </div>
  );
};

Usecase.propTypes = {
  usecase: PropTypes.object.isRequired,
  onClickEditButton: PropTypes.func.isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
};

export default Usecase;
