import { takeLatest, call, put } from '@redux-saga/core/effects';
import * as Api from '../api';
import * as CreateTaskActions from '../actions';
import { createConfig } from '../utils';
import { push } from 'react-router-redux';

function* createTask(action) {
  try {
    const config = createConfig(action);
    // yield call(Api.createTask, config);
    yield put(push('/home'));
  } catch (e) {}
}

export default function* watchCreateTask() {
  yield takeLatest(CreateTaskActions.CREATE_TASK, createTask);
}
