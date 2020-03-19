import actionsTypes from './actions-types';

/**
* Add contact
*/
export const addContact = (contact) => ({
  type: actionsTypes.ADD_CONTACT,
  contact,
});

/**
* Delete contact
*/
export const deleteContact = (id) => ({
  type: actionsTypes.DELETE_CONTACT,
  id,
});

/**
* Update contact
*/
export const updateContact = (id) => ({
  type: actionsTypes.UPDATE_CONTACT,
  id,
});
