import React from 'react';
import TaskLists from '../../containers/TaskLists';
import TaskList from '../../containers/TaskList';
import TaskDetail from '../TaskDetail';
import './index.css'

const MainComponent = () => {
    return (
        <div className='main-component-container'>
            <TaskLists />
            <TaskList />
            <TaskDetail />
        </div>
    )
}

export default MainComponent;