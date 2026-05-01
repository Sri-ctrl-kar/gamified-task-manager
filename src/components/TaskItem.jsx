import './TaskItem.css';

const categoryLabels = {
  Study: 'BOOK',
  Build: 'HAMMER',
  Debug: 'BUG',
  Review: 'CHECK'
};

function TaskItem({ task, isBursting, onComplete, onDelete }) {
  const category = task.category || 'Study';

  return (
    <article
      className={`taskItem difficulty${task.difficulty} ${
        task.completed ? 'taskItemCompleted' : ''
      }`}
    >
      {isBursting && <span className="xpBurst">+{task.xp} XP</span>}

      <div className="questIcon" aria-hidden="true">
        {categoryLabels[category]}
      </div>

      <div className="questInfo">
        <div className="questTopLine">
          <span>{category}</span>
          <span>{task.difficulty}</span>
        </div>
        <h3>{task.title}</h3>
        <div className="rewardLine">
          <span>{task.xp} XP reward</span>
          <span>{task.completed ? 'Cleared' : 'In progress'}</span>
        </div>
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
