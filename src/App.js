import React, { useEffect } from 'react';
import './App.css';
import {loadTasksApi } from './GoogleAPI'
import Header from './components/Header'




function App() {



  // This Component Will work Similar to Component Did Mount
  useEffect(loadTasksApi);


  return (
    <div className="App">
      <Header></Header>
      <div className='column column-1'>Task Lists</div>
      <div className='column column-2'>Task List</div>
      <div className='column column-3'>Task</div>
    </div>
  );
}

export default App;
