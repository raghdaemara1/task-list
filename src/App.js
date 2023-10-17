
import './App.css';
import TaskList from './Task/TaskList';
import LoginPage from './LoginPage';
import React , {useState} from 'react';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
  
    <div className="App">
       {!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <div>Welcome, User!</div>}
        <h1>Task List</h1>
        <TaskList />
      </div>

  );
}

export default App;
