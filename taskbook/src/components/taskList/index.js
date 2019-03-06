import React from 'react';
import './index.css';

export default class TaskList extends React.Component {
  state = {
    taskData: '',
    status: 'Не выполнено',
  }

  componentDidMount = () => {
    fetch('https://uxcandy.com/~shapoval/test-task-backend/?developer=Zerover')
      .then(res => res.text())
      .then((result) => {
        this.props.setLoadData(JSON.parse(result));
        this.setState({ taskData: JSON.parse(result) });
        this.props.setLoadStatus();
      });
  }

  onChangeTask = (param) => {
    if (this.props.admin === 'true') {
      this.props.history.push('/edit');
      this.props.getTargetData(param);
    }
  }

  getTaskList = state => state.message.tasks.map((e) => {
    let checkboxStatus = false;
    let checkbox = null;
    let button = null;
    let taskStatus = this.state.status;
    if (e.status === 10) {
      taskStatus = 'Выполнено';
      checkboxStatus = true;
    }
    if (this.props.admin === 'true') {
      checkbox = <input key={e.username} type="checkbox" checked={checkboxStatus} onChange={this.onCheckboxChange} />;
      button = <button
      data-id={e.id}
      className="button_task-change"
      type="button"
      onClick={() => { this.onChangeTask(e); }}
    >
    Изменить
    </button>
    }
    return (
      <div className="task" key={e.username}>
        <span>{e.username}</span>
        <span>{e.email}</span>
        <span>{taskStatus}</span>
        {checkbox}
        <p>{e.text}</p>
        {button}
      </div>
    );
  })

  render() {
    let taskList = null;
    if (this.props.load === 'load') {
      taskList = this.getTaskList(this.state.taskData);
    } else if (this.props.sort === 'sort') {
      taskList = this.getTaskList(this.props.data);
    } else if (this.props.changePage === 'true') {
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
