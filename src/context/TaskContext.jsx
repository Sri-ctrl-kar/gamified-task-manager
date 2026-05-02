import { createContext, useContext, useMemo, useState } from 'react';
import { useLevelSystem } from '../hooks/useLevelSystem';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext(null);

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

const difficultyOptions = {
  Easy: 20,
  Medium: 35,
  Hard: 50
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('gtm_tasks', STARTER_TASKS);
  const [totalXp, setTotalXp] = useLocalStorage('gtm_total_xp', 0);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('gtm_dark_mode', true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('Easy');
  const [newTaskCategory, setNewTaskCategory] = useState('Study');
  const [levelMessage, setLevelMessage] = useState(null);
  const [xpBurst, setXpBurst] = useState(null);

  const levelInfo = useLevelSystem(totalXp);

  const taskStats = useMemo(() => {
    const activeTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    const totalPossibleXp = tasks.reduce((sum, task) => sum + task.xp, 0);
    const earnedXp = completedTasks.reduce((sum, task) => sum + task.xp, 0);

    return {
      activeTasks,
      completedTasks,
      totalPossibleXp,
      earnedXp,
      completionPercent:
        tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0
    };
  }, [tasks]);

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
    setXpBurst({ id: taskId, xp: finishedTask.xp });

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
    <TaskContext.Provider
      value={{
        tasks,
        taskStats,
        levelInfo,
        totalXp,
        isDarkMode,
        setIsDarkMode,
        newTaskTitle,
        newTaskDifficulty,
        newTaskCategory,
        levelMessage,
        xpBurst,
        setLevelMessage,
        setNewTaskTitle,
        setNewTaskDifficulty,
        setNewTaskCategory,
        addTask,
        completeTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used inside TaskProvider');
  }

  return context;
}
