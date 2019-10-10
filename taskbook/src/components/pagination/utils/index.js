const urlForPage =
  'https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=';

export const getPaginationPage = (status, numberPage, field, direction) => {
  if (status)
    return `${urlForPage}${numberPage}&sort_field=${field}&sort_direction=${direction}`;
  return `${urlForPage}${numberPage}`;
};
