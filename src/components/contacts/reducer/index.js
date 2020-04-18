import { fromJS } from 'immutable';

import actionsTypes from '../action/actions-types';
import initialState from './initial-state';

const actionContact = (state, action) => (
  fromJS(state)
    .setIn(['items'], action.contacts)
    .toJS()
);

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ACTION_CONTACT:
      return actionContact(state, action);
    default:
      return state;
  }
};
