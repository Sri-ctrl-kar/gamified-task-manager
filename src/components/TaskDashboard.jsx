import { useMemo, useState } from 'react';
import TaskItem from './TaskItem';
import XPProgressBar from './XPProgressBar';
import badgeIcon from '../assets/level-badge.svg';
import './TaskDashboard.css';

function TaskDashboard({
  tasks,
  taskStats,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortMode, setSortMode] = useState('xp-high');
  const playerTitle =
    levelInfo.level >= 5 ? 'Elite Operator' : levelInfo.level >= 3 ? 'Field Specialist' : 'Recruit Planner';
  const completedTasks = taskStats.completedTasks;

  const activeTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return taskStats.activeTasks
      .filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(normalizedSearch);
        const matchesCategory =
          categoryFilter === 'All' || (task.category || 'Study') === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((first, second) => {
        if (sortMode === 'xp-high') return second.xp - first.xp;
        if (sortMode === 'xp-low') return first.xp - second.xp;
        return first.title.localeCompare(second.title);
      });
    // useMemo keeps filtering fast as the task list grows for the pagination/search requirement.
  }, [categoryFilter, searchTerm, sortMode, taskStats.activeTasks]);

  return (
    <section className="dashboard">
      <header className="dashboardHeader">
        <div>
          <h1>Mission Board</h1>
          <p className="introText">
            Deploy tasks, clear objectives, and climb the XP ranks.
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
          <span>Mission clear</span>
          <strong>{taskStats.completionPercent}%</strong>
        </article>
        <article>
          <span>XP collected</span>
          <strong>{taskStats.earnedXp}/{taskStats.totalPossibleXp || 0}</strong>
        </article>
        <article>
          <span>Open missions</span>
          <strong>{taskStats.activeTasks.length}</strong>
        </article>
      </div>

      <form className="taskForm" onSubmit={onAddTask}>
        <label htmlFor="taskTitle">New mission</label>
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

      <div className="taskTools">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search missions"
          aria-label="Search missions"
        />
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          aria-label="Filter by category"
        >
          <option>All</option>
          <option>Study</option>
          <option>Build</option>
          <option>Debug</option>
          <option>Review</option>
        </select>
        <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
          aria-label="Sort missions"
        >
          <option value="xp-high">Highest XP</option>
          <option value="xp-low">Lowest XP</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div className="taskStats" aria-label="Task totals">
        <span>{taskStats.activeTasks.length} active ops</span>
        <span>{completedTasks.length} cleared</span>
        <span>{levelInfo.totalXp} total XP</span>
      </div>

      <div className="taskColumns">
        <div>
          <h2>Active Operations</h2>
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
              <p className="emptyMessage">No active operations. Add a mission to deploy.</p>
            )}
          </div>
        </div>

        <div>
          <h2>Cleared Objectives</h2>
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
              <p className="emptyMessage">Cleared objectives will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskDashboard;
