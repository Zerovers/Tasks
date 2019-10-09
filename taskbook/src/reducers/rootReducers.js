import { combineReducers } from 'redux';
import data from './dataReducer';
import filter from './filterReducer';
import auth from '../components/auth/reducers';

const rootReducers = combineReducers({
  filter,
  data,
  auth
});

export default rootReducers;
