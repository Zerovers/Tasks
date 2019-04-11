import React from 'react';
import { connect } from 'react-redux';
import changeDirection from '../../actions/changeDirection';
import changeField from '../../actions/changeField';
import loadData from '../../actions/loadData';
import changeFilterStatus from '../../actions/chagneFilterStatus';
import store from '../../store';

class SortData extends React.Component {
  onChangeSortValue = (e) => {
    store.dispatch(changeField(e.target.value));
  }

  onChangeSortDirection = (e) => {
    store.dispatch(changeDirection(e.target.value));
  }

  onSortData = () => {
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&sort_field=${this.props.filter.field}&sort_direction=${this.props.filter.direction}`)
      .then(res => res.text())
      .then((result) => {
        store.dispatch(changeFilterStatus());
        store.dispatch(loadData(JSON.parse(result).message));
      });
  }

  render() {
    console.log('sort', this.props);
    return (
      <>
        <span>Sorting for:</span>
        <select value={this.props.filter.field} onChange={this.onChangeSortValue}>
          <option value="username">Login</option>
          <option value="email ">Email</option>
          <option value="status">Status</option>
        </select>
        <span>and:</span>
        <select value={this.props.filter.direction} onChange={this.onChangeSortDirection}>
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
      </>
    );
  }
}

export default connect(state => ({
  filter: {
    field: state.filter.filters.field,
    direction: state.filter.filters.direction,
  },
}))(SortData);
