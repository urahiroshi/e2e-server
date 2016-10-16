export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = (name) => ({
  type: SHOW_MODAL,
  name,
});

export const hideModal = (name) => ({
  type: HIDE_MODAL,
  name,
});
