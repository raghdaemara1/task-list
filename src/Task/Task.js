import React, { useState } from 'react';

const Task = ({ id, name: initialName, description: initialDescription, status, onEdit, onDelete }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [taskStatus, setTaskStatus] = useState(status);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(id, name, description, taskStatus);
    setIsEditing(false);
  };

  const getStatusColor = () => {
    switch (taskStatus) {
      case 'Not Started':
        return 'red';
      case 'In Progress':
        return 'yellow';
      case 'Finished':
        return 'green';
      default:
        return 'white';
    }
  };

  return (
    <div className="task-item" style={{ backgroundColor: getStatusColor() }}>
      <div>
        {isEditing ? (
          <div>
            <label>Task Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Task Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>Status:</label>
            <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <strong>Task Name:</strong> {name} <br />
            <strong>Task Description:</strong> {description} <br />
            <strong>Status:</strong> {taskStatus}
          </div>
        )}
        <button onClick={handleEditClick}>{isEditing ? 'Cancel' : 'Edit'}</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
