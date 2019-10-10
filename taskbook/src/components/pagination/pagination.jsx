import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as DataActions from '../../actions/loadData';
import { getPaginationPage } from './utils';

const Pagination = () => {
  const dispatch = useDispatch();
  const [numberPage, setNumberPage] = useState(1);
  const { filter, data } = useSelector(store => store);
  const { field, direction, status } = filter;
  const { total_task_count: totalTaskCount } = data;

  const getFetchPage = index => {
    const currentPage = index + 1;
    setNumberPage(currentPage);
    const url = getPaginationPage(status, currentPage, field, direction);
    fetch(url)
      .then(res => res.text())
      .then(result =>
        dispatch(DataActions.loadData(JSON.parse(result).message))
      );
  };

  const cyclePaginationRight = async () => {
    const maxPage = Math.ceil(totalTaskCount / 3);
    const currentPage = numberPage === maxPage ? maxPage : numberPage + 1;
    setNumberPage(currentPage);
    const url = getPaginationPage(status, currentPage, field, direction);
    fetch(url)
      .then(res => res.text())
      .then(result =>
        dispatch(DataActions.loadData(JSON.parse(result).message))
      );
  };

  const cyclePaginationLeft = () => {
    const currentPage = numberPage <= 1 ? 1 : numberPage - 1;
    setNumberPage(currentPage);
    const url = getPaginationPage(status, currentPage, field, direction);
    fetch(url)
      .then(res => res.text())
      .then(result =>
        dispatch(DataActions.loadData(JSON.parse(result).message))
      );
  };

  const getPagination = () =>
    new Array(Math.ceil(totalTaskCount / 3)).fill('').map((e, index) => (
      <li className="page-item" key={`item${index + 1}`}>
        <button
          type="button"
          className="page-link"
          onClick={() => getFetchPage(index)}
        >
          {index + 1}
        </button>
      </li>
    ));

  let pagination = null;
  if (totalTaskCount) {
    pagination = getPagination();
  }
  return (
    <>
      <nav aria-label="Page navigation" className="pagination">
        <ul className="pagination">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={cyclePaginationLeft}
            >
              Previous
            </button>
          </li>
          {pagination}
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={cyclePaginationRight}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
