import { LOAD_DATA } from '../../constant';

const loadData = data => ({
  type: LOAD_DATA,
  data,
});

export default loadData;
