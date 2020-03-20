import actionsTypes from './actions-types';
import store from '../../../store';

/**
* Add contact
*/
const actionContact = (contacts) => ({
  type: actionsTypes.ACTION_CONTACT,
  contacts,
});

// /**
// * Delete contact
// */
// export const deleteContact = (id) => ({
//   type: actionsTypes.DELETE_CONTACT,
//   id,
// });

export const addContact = (contact) => {
  const { items } = store.getState().contacts;
  items.push(contact);
  store.dispatch(actionContact(items));
};

export const deleteContact = (id) => {
  const { items } = store.getState().contacts;
  items.map((contact, i) => {
    if (id === contact.id) {
      items.splice(i, 1);
    }
    return null;
  });
  store.dispatch(actionContact(items));
};
