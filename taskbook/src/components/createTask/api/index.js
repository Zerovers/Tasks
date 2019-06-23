import { DEVELOP_URL } from '../../core/constants';

export const createTask = config =>
  fetch(DEVELOP_URL, config)
    .then(res => res.text())
    .then(res => console.log(res));
