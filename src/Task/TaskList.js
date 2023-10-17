import React, { useState } from 'react';
import Task from './Task';
import './Task.scss';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Description 1', status: 'Not Started' },
    { id: 2, name: 'Task 2', description: 'Description 2', status: 'Not Started' }
  ]);

  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'Not Started' });

  const handleEditTask = (taskId, updatedName, updatedDescription, updatedStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, name: updatedName, description: updatedDescription, status: updatedStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks(prevTasks => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
    setNewTask({ name: '', description: '', status: 'Not Started' });
  };

  return (
    <div className="task-list clearfix">
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <label>Task Description:</label>
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <label>Status:</label>
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {tasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
          status={task.status}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
