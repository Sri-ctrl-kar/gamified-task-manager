import TaskItem from './TaskItem';
import XPProgressBar from './XPProgressBar';
import badgeIcon from '../assets/level-badge.svg';
import './TaskDashboard.css';

function TaskDashboard({
  tasks,
  levelInfo,
  newTaskTitle,
  newTaskDifficulty,
  newTaskCategory,
  xpBurst,
  onTitleChange,
  onDifficultyChange,
  onCategoryChange,
  onAddTask,
  onCompleteTask,
  onDeleteTask
}) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const totalPossibleXp = tasks.reduce((sum, task) => sum + task.xp, 0);
  const earnedXp = completedTasks.reduce((sum, task) => sum + task.xp, 0);
  const completionPercent =
    tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
  const playerTitle =
    levelInfo.level >= 5 ? 'Quest Champion' : levelInfo.level >= 3 ? 'Task Ranger' : 'Apprentice Planner';

  return (
    <section className="dashboard">
      <header className="dashboardHeader">
        <div>
          <p className="eyebrow">Student capstone quest</p>
          <h1>Quest Board</h1>
          <p className="introText">
            Plan missions, collect XP, and build a streak of completed work.
          </p>
        </div>
        <div className="playerCard">
          <img className="badgeImage" src={badgeIcon} alt="Level badge" />
          <div>
            <span>{playerTitle}</span>
            <strong>Level {levelInfo.level}</strong>
          </div>
        </div>
      </header>

      <XPProgressBar levelInfo={levelInfo} />

      <div className="gameStats" aria-label="Player statistics">
        <article>
          <span>Quest clear</span>
          <strong>{completionPercent}%</strong>
        </article>
        <article>
          <span>XP collected</span>
          <strong>{earnedXp}/{totalPossibleXp || 0}</strong>
        </article>
        <article>
          <span>Open missions</span>
          <strong>{activeTasks.length}</strong>
        </article>
      </div>

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
          <select
            value={newTaskCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Task category"
          >
            <option>Study</option>
            <option>Build</option>
            <option>Debug</option>
            <option>Review</option>
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
                  isBursting={xpBurst?.id === task.id}
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
                  isBursting={false}
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
