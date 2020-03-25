import React, { useEffect } from 'react';
import './App.css';
import {loadTasksApi } from './GoogleAPI'
import Header from './components/Header'
import MainComponent from './components/MainComponent'




function App() {



  // This Component Will work Similar to Component Did Mount
  useEffect(loadTasksApi);


  return (
    <div className="App">
      <Header></Header>
      <MainComponent/>
    </div>
  );
}

export default App;
