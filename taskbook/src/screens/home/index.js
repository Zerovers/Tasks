import React from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import TaskList from '../../components/taskList';

class MainPage extends React.Component {
  state = {
    sortValue: 'username',
    sortDirection: 'desc',
    data: '',
    sort: '',
    load: '',
    numberPage: 1,
    changePage: 'false',
  }

  onChangeSortValue = (e) => {
    this.setState({ sortValue: e.target.value });
  }

  onChangeSortDirection = (e) => {
    this.setState({ sortDirection: e.target.value });
  }

  onSortData = () => {
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&sort_field=${this.state.sortValue}&sort_direction=${this.state.sortDirection}`)
      .then(res => res.text())
      .then((result) => {
        console.log(JSON.parse(result));
        this.setState({ data: JSON.parse(result), sort: 'sort', load: 'false' });
      });
  }

  setLoadStatus = () => {
    this.setState({ load: 'load' });
  }

  setLoadData = (data) => {
    this.setState({ data });
  }

  getFetchPage = (numberPage) => {
    this.setState({ load: '' });
    let url;
    if (this.state.sort === '') {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage}`;
    } else {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage}&sort_field=${this.state.sortValue}&sort_direction=${this.state.sortDirection}`;
    }
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        console.log('fetchtaskList', JSON.parse(result));
        this.setState({ data: JSON.parse(result), changePage: 'true', numberPage });
      });
  }

  cyclePaginationRight = (page) => {
    let numberPage = page;
    const countPage = Math.ceil(this.state.data.message.total_task_count / 3);
    if (numberPage >= countPage) {
      numberPage = countPage - 1;
    }
    this.setState({ load: '' });
    let url;
    if (this.state.sort === '') {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage + 1}`;
    } else {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage + 1}&sort_field=${this.state.sortValue}&sort_direction=${this.state.sortDirection}`;
    }
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        this.setState({ data: JSON.parse(result), changePage: 'true', numberPage: numberPage + 1 });
      });
  }

  cyclePaginationLeft = (page) => {
    let numberPage = page;
    if (numberPage <= 1) {
      numberPage = 1;
    }
    this.setState({ load: '' });
    let url;
    if (this.state.sort === '') {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage - 1}`;
    } else {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage - 1}&sort_field=${this.state.sortValue}&sort_direction=${this.state.sortDirection}`;
    }
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        this.setState({ data: JSON.parse(result), changePage: 'true', numberPage: numberPage - 1 });
      });
  }

  getPagination = count => new Array(count).fill('').map((e, i) => (
    <li className="page-item" key={`Страница${i + 1}`}><button type="button" className="page-link" onClick={() => { this.getFetchPage(i + 1); }}>{i + 1}</button></li>
  ))

  render() {
    let pages = null;
    if (this.state.data !== '') {
      pages = this.getPagination(Math.ceil(this.state.data.message.total_task_count / 3));
    }
    return (
      <div>
        <div className="sort-content">
          <span>Sorting for:</span>
          <select value={this.state.sortValue} onChange={this.onChangeSortValue}>
            <option value="username">Login</option>
            <option value="email ">Email</option>
            <option value="status">Status</option>
          </select>
          <span>and:</span>
          <select value={this.state.sortDirection} onChange={this.onChangeSortDirection}>
            <option value="desc">descending</option>
            <option value="asc">ascending</option>
          </select>
          <button
            className="button_sort"
            type="button"
            onClick={this.onSortData}
          >
            Сортировать
          </button>
        </div>
        <TaskList
          data={this.state.data}
          sort={this.state.sort}
          load={this.state.load}
          setLoadStatus={this.setLoadStatus}
          setLoadData={this.setLoadData}
          admin={this.props.admin}
          numberPage={this.state.numberPage}
          changePage={this.state.changePage}
          getTargetData={this.props.getTargetData}
          getCheckbox={this.props.getCheckbox}
          history={this.props.history}
        />
        <nav aria-label="Page navigation" className="pagination">
          <ul className="pagination">
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={() => { this.cyclePaginationLeft(this.state.numberPage); }}
              >
              Previous
              </button>
            </li>
            {pages}
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                onClick={() => { this.cyclePaginationRight(this.state.numberPage); }}
              >
              Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
const HomePageRoute = withRouter(MainPage);
export default HomePageRoute;
