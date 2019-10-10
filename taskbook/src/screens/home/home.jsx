import React from 'react';
import './index.css';
import TaskList from '../../components/taskList/taskList';
import SortData from '../../components/sort/sortData';
import Pagination from '../../components/pagination/pagination';

const HomePage = () => (
  <div className="task-content">
    <div className="sort-content">
      <SortData />
    </div>
    <TaskList />
    <Pagination />
  </div>
);

export default HomePage;
