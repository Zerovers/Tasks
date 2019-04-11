import { FILTER_DIRECTION } from '../../constant';

const changeDirection = direction => ({
  type: FILTER_DIRECTION,
  direction,
});

export default changeDirection;
