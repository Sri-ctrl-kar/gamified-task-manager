import TaskDashboard from '../components/TaskDashboard';
import { useTaskContext } from '../context/TaskContext';

function DashboardPage() {
  const {
    tasks,
    taskStats,
    levelInfo,
    newTaskTitle,
    newTaskDifficulty,
    newTaskCategory,
    xpBurst,
    setNewTaskTitle,
    setNewTaskDifficulty,
    setNewTaskCategory,
    addTask,
    completeTask,
    deleteTask
  } = useTaskContext();

  return (
    <TaskDashboard
      tasks={tasks}
      taskStats={taskStats}
      levelInfo={levelInfo}
      newTaskTitle={newTaskTitle}
      newTaskDifficulty={newTaskDifficulty}
      newTaskCategory={newTaskCategory}
      xpBurst={xpBurst}
      onTitleChange={setNewTaskTitle}
      onDifficultyChange={setNewTaskDifficulty}
      onCategoryChange={setNewTaskCategory}
      onAddTask={addTask}
      onCompleteTask={completeTask}
      onDeleteTask={deleteTask}
    />
  );
}

export default DashboardPage;
