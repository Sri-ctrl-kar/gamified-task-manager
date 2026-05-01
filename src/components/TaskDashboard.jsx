import TaskItem from './TaskItem';
import XPProgressBar from './XPProgressBar';
import badgeIcon from '../assets/level-badge.svg';
import './TaskDashboard.css';

function TaskDashboard({
  tasks,
  levelInfo,
  newTaskTitle,
  newTaskDifficulty,
  onTitleChange,
  onDifficultyChange,
  onAddTask,
  onCompleteTask,
  onDeleteTask
}) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <section className="dashboard">
      <header className="dashboardHeader">
        <div>
          <p className="eyebrow">Student capstone</p>
          <h1>Quest Board</h1>
          <p className="introText">
            Turn study tasks into small XP wins and keep progress saved in the browser.
          </p>
        </div>
        <img className="badgeImage" src={badgeIcon} alt="Level badge" />
      </header>

      <XPProgressBar levelInfo={levelInfo} />

      <form className="taskForm" onSubmit={onAddTask}>
        <label htmlFor="taskTitle">New quest</label>
        <div className="formRow">
          <input
            id="taskTitle"
            type="text"
            value={newTaskTitle}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Example: Review useEffect notes"
          />
          <select
            value={newTaskDifficulty}
            onChange={(event) => onDifficultyChange(event.target.value)}
            aria-label="Task difficulty"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button type="submit">Add Task</button>
        </div>
      </form>

      <div className="taskStats" aria-label="Task totals">
        <span>{activeTasks.length} active</span>
        <span>{completedTasks.length} completed</span>
        <span>{levelInfo.totalXp} total XP</span>
      </div>

      <div className="taskColumns">
        <div>
          <h2>Active Tasks</h2>
          <div className="taskList">
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={onCompleteTask}
                  onDelete={onDeleteTask}
                />
              ))
            ) : (
              <p className="emptyMessage">No active tasks. Add a quest to begin.</p>
            )}
          </div>
        </div>

        <div>
          <h2>Finished</h2>
          <div className="taskList">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={onCompleteTask}
                  onDelete={onDeleteTask}
                />
              ))
            ) : (
              <p className="emptyMessage">Completed quests will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskDashboard;
