import actionsTypes from './actions-types';
import store from '../../../store';

const actionContact = (contacts) => ({
  type: actionsTypes.ACTION_CONTACT,
  contacts,
});

/**
* Add contact
*/
export const addContact = (contact) => {
  const { items } = store.getState().contacts;
  items.push(contact);
  store.dispatch(actionContact(items));
};

/**
* Delete contact
*/
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

/**
* Update contact
*/
export const updateContact = (id, contactData) => {
  const { items } = store.getState().contacts;
  // console.log(id);
  // console.log(contactData);
  items.map((contact, i) => {
    if (id === contact.id) {
      items[i] = contactData;
    }
    return null;
  });
  store.dispatch(actionContact(items));
};
