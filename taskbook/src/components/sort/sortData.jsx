import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import changeDirection from '../../actions/changeDirection';
import changeField from '../../actions/changeField';
import * as DataActions from '../../actions/loadData';
import changeFilterStatus from '../../actions/chagneFilterStatus';

const SortData = () => {
  const dispatch = useDispatch();
  const { direction, field } = useSelector(({ filter }) => filter);
  const handleSortData = () => {
    fetch(
      `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&sort_field=${field}&sort_direction=${direction}`
    )
      .then(res => res.text())
      .then(result => {
        dispatch(changeFilterStatus());
        dispatch(DataActions.loadData(JSON.parse(result).message));
      });
  };
  const handleChangeField = ({ target }) => dispatch(changeField(target.value));
  const handleChangeDirection = ({ target }) =>
    dispatch(changeDirection(target.value));
  return (
    <>
      <span>Sorting for:</span>
      <select value={field} onChange={handleChangeField}>
        <option value="username">Login</option>
        <option value="email">Email</option>
        <option value="status">Status</option>
      </select>
      <span>and:</span>
      <select value={direction} onChange={handleChangeDirection}>
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
      <button className="button_sort" type="button" onClick={handleSortData}>
        Сортировать
      </button>
    </>
  );
};

export default SortData;
