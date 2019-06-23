import { all } from 'redux-saga/effects';
import watchCreateTask from './components/createTask/sagas';

export default function* rootSaga() {
  yield all([watchCreateTask()]);
}
