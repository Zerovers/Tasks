import * as AuthActions from '../actions';
import { combineReducers } from 'redux';

const authStatus = (state = '', action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return 'login';
    case AuthActions.LOGOUT:
      return 'logout';
    default:
      return state;
  }
};

const admin = (state = false, action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return true;
    case AuthActions.LOGOUT:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  authStatus,
  admin
});
