import React, {useState,useEffect} from 'react';
import './App.css';
import {loadTasksApi, handleAuthClick, handleSignoutClick} from './GoogleAPI'




function App() {


  // TODO : Need To implement a header next
  const [isSignedIn] = useState(false);

  // This Component Will work Similar to Component Did Mount
  useEffect(loadTasksApi);


  return (
    <div className="App">
      <div className='column column-1'>Task Lists</div>
      <div className='column column-2'>Task List</div>
      <div className='column column-3'>Task</div>
      {isSignedIn? <div onClick={handleSignoutClick}>Sign Out</div>: <div onClick={handleAuthClick}>Sign in</div>}
    </div>
  );
}

export default App;
