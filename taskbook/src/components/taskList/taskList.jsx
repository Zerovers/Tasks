import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import Task from './containers/Task';

class TaskList extends React.Component {
  onChangeTask = () => {
    this.props.history.push('/edit/');
  };

  render() {
    const { tasksList } = this.props;
    if (!tasksList) return null;
    return (
      <div className="task-list">
        {tasksList.map(task => (
          <Task {...task} key={task.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ data: { tasks }, auth: { authStatus, admin } }) => ({
  tasksList: tasks,
  authStatus,
  admin
});

export default connect(
  mapStateToProps,
  null
)(TaskList);
