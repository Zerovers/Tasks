export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_SUCCEEDED = `${CREATE_TASK}_SUCCEEDED`;
export const CREATE_TASK_FAILED = `${CREATE_TASK}_FAILED`;

export const createTask = payload => ({ type: CREATE_TASK, payload });
