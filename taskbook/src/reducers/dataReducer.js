import { LOAD_DATA } from '../../constant';

const dataReducer = (state = {}, { type, data }) => {
  switch (type) {
    case LOAD_DATA:
      return { ...state, data };
    default:
      return state;
  }
};

export default dataReducer;
