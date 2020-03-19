// import { fromJS } from 'immutable';

import actionsTypes from '../action/actions-types';
import initialState from './initial-state';

const addContact = (state, action) => ({
  items: state.items.concat(action.contact),
});
// const addContact = (state, action) => (
//   fromJS(state)
//     .setIn(['item'], action.contact)
//     .toJS()
// );

const deleteContact = (state, action) => ({
  items: state.items.filter((user) => user.id !== action.id),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_CONTACT:
      return addContact(state, action);
    case actionsTypes.DELETE_CONTACT:
      return deleteContact(state, action);
    default:
      return state;
  }
};
