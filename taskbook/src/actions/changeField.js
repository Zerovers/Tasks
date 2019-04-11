import { FILTER_FIELD } from '../../constant';

const changeField = field => ({
  type: FILTER_FIELD,
  field,
});

export default changeField;
