import validateAction from '../validators/action';

const validate = (usecase) => {
  const errors = {};
  if (!usecase.url || usecase.url.trim().length === 0) {
    errors.url = 'not to be empty';
  }
  if (!usecase.name || usecase.name.trim().length === 0) {
    errors.name = 'not to be empty';
  }
  usecase.actions.forEach((action, i) => {
    const actionErrors = validateAction(action);
    if (Object.keys(actionErrors).length > 0) {
      if (!errors.actions) { errors.actions = {}; }
      errors.actions[i] = actionErrors;
    }
  });
  return errors;
};

export default validate;
