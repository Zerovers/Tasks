import React from 'react';
import { connect } from 'react-redux';
import changeDirection from '../../actions/changeDirection';
import changeField from '../../actions/changeField';
import loadData from '../../actions/loadData';
import changeFilterStatus from '../../actions/chagneFilterStatus';

class SortData extends React.Component {
  onSortData = () => {
    fetch(
      `https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover&sort_field=${this.props.filter.field}&sort_direction=${this.props.filter.direction}`
    )
      .then(res => res.text())
      .then(result => {
        this.props.changeFilterStatus();
        this.props.loadData(JSON.parse(result).message);
      });
  };

  render() {
    return (
      <>
        <span>Sorting for:</span>
        <select
          value={this.props.filter.field}
          onChange={e => {
            this.props.changeField(e.target.value);
          }}
        >
          <option value="username">Login</option>
          <option value="email">Email</option>
          <option value="status">Status</option>
        </select>
        <span>and:</span>
        <select
          value={this.props.filter.direction}
          onChange={e => {
            this.props.changeDirection(e.target.value);
          }}
        >
          <option value="desc">descending</option>
          <option value="asc">ascending</option>
        </select>
        <button className="button_sort" type="button" onClick={this.onSortData}>
          Сортировать
        </button>
      </>
    );
  }
}

export default connect(
  state => ({
    filter: {
      field: state.filter.filters.field,
      direction: state.filter.filters.direction
    }
  }),
  dispatch => ({
    changeFilterStatus: () => dispatch(changeFilterStatus()),
    loadData: (...arg) => dispatch(loadData(...arg)),
    changeField: (...arg) => dispatch(changeField(...arg)),
    changeDirection: (...arg) => dispatch(changeDirection(...arg))
  })
)(SortData);
