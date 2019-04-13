import React from 'react';
import './index.css';
import { connect } from 'react-redux';

class TaskList extends React.Component {
  onChangeTask = () => {
    this.props.history.push('/edit/');
  }

  getTaskList = props => props.tasks.map((e) => {
    let button = null;
    if (this.props.admin === 'true') {
      button = <button data-id={e.id} className="button_task-change" type="button" onClick={() => { this.props.history.push(`/edit/${e.id}`); }}>Изменить</button>;
    }
    return (
      <div className="task" key={e.id}>
        <span>{e.username}</span>
        <span>{e.email}</span>
        <span>{e.status === 10 ? 'Выполнено' : 'Не выполнено'}</span>
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
