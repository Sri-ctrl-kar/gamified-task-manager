import './TaskItem.css';

function TaskItem({ task, onComplete, onDelete }) {
  return (
    <article className={`taskItem ${task.completed ? 'taskItemCompleted' : ''}`}>
      <div>
        <h3>{task.title}</h3>
        <p>
          {task.difficulty} quest • {task.xp} XP
        </p>
      </div>

      <div className="taskActions">
        {!task.completed && (
          <button className="completeButton" onClick={() => onComplete(task.id)}>
            Complete
          </button>
        )}
        <button className="deleteButton" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
