const isInputAction = (type) => {
  const inputActions = ['input', 'select'];
  return (inputActions.indexOf(type) >= 0);
};

const isSelectorAction = (type) => {
  const notSelectorActions = ['getScreenshot'];
  return (notSelectorActions.indexOf(type) < 0);
};

const validate = (action) => {
  const errors = {};
  if (isSelectorAction(action.type)) {
    action.selectors.forEach((selector, i) => {
      if (!selector || selector.trim().length === 0) {
        if (!errors.selectors) { errors.selectors = {}; }
        errors.selectors[i] = 'not to be empty';
      }
    });
  }
  if (isInputAction(action.type)) {
    if (!action.value || action.value.trim().length === 0) {
      errors.value = 'not to be empty';
    }
  }
  return errors;
};

export default validate;
