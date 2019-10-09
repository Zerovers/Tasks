import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import filterReducer from './filterReducer';
import auth from '../components/auth/reducers';

const rootReducers = combineReducers({
  filter: filterReducer,
  data: dataReducer,
  auth
});

export default rootReducers;
