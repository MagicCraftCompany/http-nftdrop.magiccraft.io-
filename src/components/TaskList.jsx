import React, { useState, useEffect } from 'react';
import './TaskList.css'; // We'll create this CSS file next

const tasksInitial = [
  {
    id: 'followDavinci',
    text: <>Follow Davinci on <img src="/Xlogo.png" alt="X logo" className="x-logo" /></>,
    link: 'https://x.com/davincij15',
    completed: false,
  },
  {
    id: 'followMagicCraft',
    text: <>Follow MagicCraft on <img src="/Xlogo.png" alt="X logo" className="x-logo" /></>,
    link: 'https://x.com/magiccraftgame',
    completed: false,
  },
  {
    id: 'likePost',
    text: <>Like this post on <img src="/Xlogo.png" alt="X logo" className="x-logo" /></>,
    link: 'https://x.com/MagicCraftGame/status/1909958379428249689?t=lHq12CNVvAOAmvPC2zoV3A&s=19',
    completed: false,
  },
];

const LOCAL_STORAGE_KEY = 'claimAppTasksCompleted';

function TaskList({ onTasksComplete }) {
  // Initialize state potentially from localStorage
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      try {
        const completedStatus = JSON.parse(savedTasks);
        // Merge saved completion status with initial task definitions
        // This ensures task text/links are up-to-date if changed in code
        return tasksInitial.map(task => ({
          ...task,
          completed: completedStatus[task.id] || false,
        }));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
        // Fallback to initial state if parsing fails
        return tasksInitial;
      }
    }
    return tasksInitial; // Default initial state
  });

  useEffect(() => {
    // Report completion status to parent on initial load and updates
    const allComplete = taskList.every(task => task.completed);
    onTasksComplete(allComplete);

    // Save completion status to localStorage whenever taskList changes
    const completedStatusToSave = taskList.reduce((acc, task) => {
      acc[task.id] = task.completed;
      return acc;
    }, {});
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedStatusToSave));

  }, [taskList, onTasksComplete]);

  const handleTaskClick = (taskId) => {
    // Update state (triggers the useEffect above to save to localStorage)
    setTaskList(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    // Optional: Open link in new tab
    const task = taskList.find(t => t.id === taskId);
    if (task?.link) {
      window.open(task.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="task-list">
      <h2>Complete Tasks to Claim:</h2>
      <ul>
        {taskList.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            {task.completed ? (
              <span className="status-label completed-label">Completed</span>
            ) : (
              <button onClick={() => handleTaskClick(task.id)}>Go</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList; 