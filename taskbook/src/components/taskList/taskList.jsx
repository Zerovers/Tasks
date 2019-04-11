import React from 'react';
import './index.css';
import { connect } from 'react-redux';

class TaskList extends React.Component {
  onChangeTask = (param) => {
    if (this.props.admin === 'true') {
      this.props.history.push('/edit');
      this.props.getTargetData(param);
    }
  }

  getTaskList = props => props.tasks.map((e) => {
    let button = null;
    let taskStatus = 'Не выполнено';
    if (e.status === 10) {
      taskStatus = 'Выполнено';
    }
    if (this.props.admin === 'true') {
      button = <button data-id={e.id} className="button_task-change" type="button" onClick={() => { this.onChangeTask(e); }}>Изменить</button>;
    }
    return (
      <div className="task" key={e.username}>
        <span>{e.username}</span>
        <span>{e.email}</span>
        <span>{taskStatus}</span>
        <p>{e.text}</p>
        {button}
      </div>
    );
  })

  render() {
    console.log('taskList', this.props);
    let taskList = null;
    if (this.props.data) {
      taskList = this.getTaskList(this.props.data);
    }
    return (
      <>
        <div className="task-list">
          {taskList}
        </div>
      </>
    );
  }
}


export default connect(state => ({
  data: state.data.data,
}))(TaskList);
