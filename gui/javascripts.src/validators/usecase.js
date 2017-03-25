import BaseValidator from './base';
import ActionValidator from './action';

class UsecaseValidator extends BaseValidator {
  constructor(usecase) {
    super();
    if (!usecase.url || usecase.url.trim().length === 0) {
      this.addError('url', 'not to be empty');
    }
    if (!usecase.name || usecase.name.trim().length === 0) {
      this.addError('name', 'not to be empty');
    }
    usecase.actions.forEach((action, i) => {
      const actionValidator = new ActionValidator(action);
      if (!actionValidator.isValid()) {
        this.addError('actions', i, actionValidator.errors);
      }
    });
  }
}

export default UsecaseValidator;
