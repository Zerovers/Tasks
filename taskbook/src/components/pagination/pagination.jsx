import React from 'react';
import { connect } from 'react-redux';
import loadData from '../../actions/loadData';

class Pagination extends React.Component {
  state = {
    numberPage: 1,
  }

  getFetchPage = (numberPage) => {
    let url;
    if (!this.props.filter.status) {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage}`;
    } else {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage}&sort_field=${this.props.filter.field}&sort_direction=${this.props.filter.direction}`;
    }
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        this.setState({ numberPage });
        this.props.loadData(JSON.parse(result).message);
      });
  }

  cyclePaginationRight = (page) => {
    let numberPage = page;
    const maxPage = Math.ceil(this.props.data.total_task_count / 3);
    if (numberPage >= maxPage) {
      numberPage = maxPage - 1;
    }
    let url;
    if (!this.props.filter.status) {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage + 1}`;
    } else {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage + 1}&sort_field=${this.props.filter.field}&sort_direction=${this.props.filter.direction}`;
    }
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        this.setState({ numberPage: numberPage + 1 });
        this.props.loadData(JSON.parse(result).message);
      });
  }

  cyclePaginationLeft = (page) => {
    let numberPage = page;
    if (numberPage <= 1) {
      numberPage = 1;
    }
    let url;
    if (!this.props.filter.status) {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage - 1}`;
    } else {
      url = `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&page=${numberPage - 1}&sort_field=${this.props.filter.field}&sort_direction=${this.props.filter.direction}`;
    }
    fetch(url)
      .then(res => res.text())
      .then((result) => {
        this.setState({ numberPage: numberPage <= 1 ? 1 : numberPage - 1 });
        this.props.loadData(JSON.parse(result).message);
      });
  }

  getPagination = data => new Array(Math.ceil(data.total_task_count / 3)).fill('').map((e, i) => (
    <li className="page-item" key={`item${i + 1}`}><button type="button" className="page-link" onClick={() => { this.getFetchPage(i + 1); }}>{i + 1}</button></li>
  ))

  render() {
    let pagination = null;
    if (this.props.data) {
      pagination = this.getPagination(this.props.data);
    }
    return (
      <>
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
            {pagination}
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
      </>
    );
  }
}

export default connect((state => ({
  filter: {
    field: state.filter.filters.field,
    direction: state.filter.filters.direction,
    status: state.filter.filters.status,
  },
  data: state.data.data,
})), (dispatch => ({
  loadData: (...arg) => dispatch(loadData(...arg)),
})))(Pagination);
