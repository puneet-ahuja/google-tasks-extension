import React, { useEffect } from 'react';
import './App.css';
import {loadTasksApi } from './GoogleAPI'
import Header from './containers/Header'
import MainComponent from './components/MainComponent'
import { connect } from 'react-redux';




function App({dispatch}) {



  // This Component Will work Similar to Component Did Mount
  useEffect(()=>loadTasksApi({dispatch}));


  return (
    <div className="App">
      <Header></Header>
      <MainComponent/>
    </div>
  );
}

export default connect()(App);
