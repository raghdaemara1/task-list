import React, { useState,useMemo } from 'react';
import Task from './Task';
import './Task.scss';
import LoginPage from '../LoginPage';

const TaskList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Description 1', status: 'Not Started' },
    { id: 2, name: 'Task 2', description: 'Description 2', status: 'Not Started' },
  
  ]);

  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'Not Started' });
  const [sortBy, setSortBy] = useState('id');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleEditTask = (taskId, updatedName, updatedDescription, updatedStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: updatedName, description: updatedDescription, status: updatedStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
    setNewTask({ name: '', description: '', status: 'Not Started' });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortedAndFilteredTasks = useMemo(() => {
    return tasks
      .sort((a, b) => (sortBy === 'id' ? a.id - b.id : a.name.localeCompare(b.name)))
      .filter((task) => filterStatus === 'All' || task.status === filterStatus);
  }, [tasks, sortBy, filterStatus]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedAndFilteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="task-list clearfix"style={{ padding: '5px' }}>
       <div className="filters" style={{ padding: '10px' }}>
            <label>Sort By:</label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="id">ID</option>
              <option value="name">Name</option>
            </select>
            <label>Filter By Status:</label>
            <select value={filterStatus} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          <div className="pagination" style={{ padding: '10px' }}>
            Page number
            {Array.from({ length: Math.ceil(sortedAndFilteredTasks.length / tasksPerPage) }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button key={pageNumber} onClick={() => paginate(pageNumber)}>
                  {pageNumber}
                </button>
              )
            )}
          </div>
      {!isLoggedIn ? (
        <div>
          <div>
            <label>Task Name:</label>
            <input type="text" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
            <label>Task Description:</label>
            <input
              type="text"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <label>Status:</label>
            <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          {currentTasks.map((task) => (
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
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default TaskList;
