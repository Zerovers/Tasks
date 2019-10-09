import React from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import TaskList from '../../components/taskList/taskList';
import SortData from '../../components/sort/sortData';
import Pagination from '../../components/pagination/pagination';
import Hooks from '../../components/hooks';

const HomePage = () => (
  <div className="task-content">
    <div className="sort-content">
      <SortData />
      <Hooks value={4} />
    </div>
    <TaskList />
    <Pagination />
  </div>
);

export default HomePage;
