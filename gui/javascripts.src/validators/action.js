import BaseValidator from './base';

const isInputAction = (type) => {
  const inputActions = ['input', 'select'];
  return (inputActions.indexOf(type) >= 0);
};

const isSelectorAction = (type) => {
  const notSelectorActions = ['getScreenshot'];
  return (notSelectorActions.indexOf(type) < 0);
};

class ActionValidator extends BaseValidator {
  constructor(action) {
    super();
    if (isSelectorAction(action.type)) {
      action.selectors.forEach((selector, i) => {
        this.addError('selectors', i, 'not to be empty');
      });
    }
    if (isInputAction(action.type)) {
      if (!action.value || action.value.trim().length === 0) {
        this.addError('value', 'not to be empty');
      }
    }
  }
}

export default ActionValidator;
