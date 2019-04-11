import { FILTER_FIELD, FILTER_DIRECTION, FILTER_STATUS } from '../../constant';

const filterReducer = (state = {
  filters: {
    field: 'username',
    direction: 'desc',
    status: false,
  },
}, { type, field, direction }) => {
  switch (type) {
    case FILTER_FIELD:
      return { ...state, filters: { ...state.filters, field } };
    case FILTER_DIRECTION:
      return { ...state, filters: { ...state.filters, direction } };
    case FILTER_STATUS:
      return { ...state, filters: { ...state.filters, status: true } };
    default:
      return state;
  }
};

export default filterReducer;
