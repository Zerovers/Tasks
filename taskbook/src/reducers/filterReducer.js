import { FILTER_FIELD, FILTER_DIRECTION, FILTER_STATUS } from '../../constant';

const filterReducer = (
  state = {
    field: 'username',
    direction: 'desc',
    status: false
  },
  { type, field, direction }
) => {
  switch (type) {
    case FILTER_FIELD:
      return { ...state, field };
    case FILTER_DIRECTION:
      return { ...state, direction };
    case FILTER_STATUS:
      return { ...state, status: true };
    default:
      return state;
  }
};

export default filterReducer;
