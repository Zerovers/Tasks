import React from 'react';

const Task = ({ id, username, email, status, text, admin }) => {
  return (
    <div className="task" key={id}>
      <span>{username}</span>
      <span>{email}</span>
      <span>{status === 10 ? 'Выполнено' : 'Не выполнено'}</span>
      <p>{text}</p>
      {admin && (
        <button
          data-id={id}
          className="button_task-change"
          type="button"
          onClick={() => {
            this.props.history.push(`/edit/${id}`);
          }}
        >
          Изменить
        </button>
      )}
    </div>
  );
};

export default Task;
