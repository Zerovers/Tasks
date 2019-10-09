import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import Task from './containers/Task';

class TaskList extends React.Component {
  onChangeTask = () => {
    this.props.history.push('/edit/');
  };

  render() {
    const { data } = this.props;
    if (!data) return null;
    return (
      <div className="task-list">
        {data.tasks.map(task => (
          <Task {...task} key={task.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth: { authStatus, admin } }) => ({
  data: data.data,
  authStatus,
  admin
});

export default connect(
  mapStateToProps,
  null
)(TaskList);
