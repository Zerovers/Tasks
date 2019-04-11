import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import filterReducer from './filterReducer';

const rootReducers = combineReducers({
  filter: filterReducer,
  data: dataReducer,
});

export default rootReducers;
