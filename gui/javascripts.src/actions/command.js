export const PREPARE_COMMAND = 'PREPARE_COMMAND';
export const START_COMMAND = 'START_COMMAND';
export const SUCCESS_COMMAND = 'SUCCESS_COMMAND';
export const FAIL_COMMAND = 'FAIL_COMMAND';
export const END_COMMAND = 'END_COMMAND';

export const prepareCommand = (name) => ({
  type: PREPARE_COMMAND,
  name,
});

export const startCommand = (name, params) => ({
  type: START_COMMAND,
  name,
  params,
});

export const successCommand = (name) => ({
  type: SUCCESS_COMMAND,
  name,
});

export const failCommand = (name, error) => ({
  type: FAIL_COMMAND,
  name,
  error,
});

export const endCommand = (name) => ({
  type: END_COMMAND,
  name,
});
