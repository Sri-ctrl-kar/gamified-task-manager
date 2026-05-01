import { useState } from 'react';
import TaskDashboard from './components/TaskDashboard';
import RewardModal from './components/RewardModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLevelSystem } from './hooks/useLevelSystem';
import './App.css';

const STARTER_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Finish React component notes',
    difficulty: 'Easy',
    category: 'Study',
    xp: 20,
    completed: false
  },
  {
    id: crypto.randomUUID(),
    title: 'Build reusable TaskItem card',
    difficulty: 'Medium',
    category: 'Build',
    xp: 35,
    completed: false
  },
  {
    id: crypto.randomUUID(),
    title: 'Test localStorage persistence',
    difficulty: 'Medium',
    category: 'Debug',
    xp: 35,
    completed: false
  }
];

function App() {
  const [tasks, setTasks] = useLocalStorage('gtm_tasks', STARTER_TASKS);
  const [totalXp, setTotalXp] = useLocalStorage('gtm_total_xp', 0);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('Easy');
  const [newTaskCategory, setNewTaskCategory] = useState('Study');
  const [levelMessage, setLevelMessage] = useState(null);
  const [xpBurst, setXpBurst] = useState(null);

  const levelInfo = useLevelSystem(totalXp);

  const difficultyOptions = {
    Easy: 20,
    Medium: 35,
    Hard: 50
  };

  function addTask(event) {
    event.preventDefault();

    const trimmedTitle = newTaskTitle.trim();
    if (!trimmedTitle) return;

    const task = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      difficulty: newTaskDifficulty,
      category: newTaskCategory,
      xp: difficultyOptions[newTaskDifficulty],
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
    setNewTaskTitle('');
    setNewTaskDifficulty('Easy');
    setNewTaskCategory('Study');
  }

  function completeTask(taskId) {
    const finishedTask = tasks.find((task) => task.id === taskId);
    if (!finishedTask || finishedTask.completed) return;

    const nextXp = totalXp + finishedTask.xp;
    const didLevelUp = Math.floor(nextXp / 100) > Math.floor(totalXp / 100);

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    setTotalXp(nextXp);
    setXpBurst({
      id: taskId,
      xp: finishedTask.xp
    });

    if (didLevelUp) {
      setLevelMessage({
        level: Math.floor(nextXp / 100) + 1,
        earnedXp: finishedTask.xp
      });
    }

    window.setTimeout(() => {
      setXpBurst(null);
    }, 900);
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="appShell">
      <TaskDashboard
        tasks={tasks}
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

      {levelMessage && (
        <RewardModal
          level={levelMessage.level}
          earnedXp={levelMessage.earnedXp}
          onClose={() => setLevelMessage(null)}
        />
      )}
    </main>
  );
}

export default App;
