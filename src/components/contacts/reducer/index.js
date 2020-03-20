import { fromJS } from 'immutable';

import actionsTypes from '../action/actions-types';
import initialState from './initial-state';

// const addContact = (state, action) => ({
//   items: state.items.concat(action.contact),
// });
const actionContact = (state, action) => (
  fromJS(state)
    .setIn(['items'], action.contacts)
    .toJS()
);

// const deleteContact = (state, action) => ({
//   items: state.items.filter((user) => user.id !== action.id),
// });

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ACTION_CONTACT:
      return actionContact(state, action);
    // case actionsTypes.DELETE_CONTACT:
    //   return deleteContact(state, action);
    default:
      return state;
  }
};
