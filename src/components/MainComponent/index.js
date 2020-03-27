import React from 'react';
import TaskLists from '../../containers/TaskLists';
import './index.css'

const MainComponent = () => {
    return (
        <div className='main-component-container'>
            <TaskLists/>
        </div>
    )
}

export default MainComponent;