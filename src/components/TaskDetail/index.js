import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { calendarIcon } from '../../constants/svgs';
import TaskDetailPlaceHolder from './components/TaskDetailPlaceHolder'

const TaskDetail = ({id,title,notes}) => {

    if(!id){
        return <TaskDetailPlaceHolder />
    }
    return (
        <div className={'task-detail-container'}>
            <div className='task-detail-header'>
                <div>{title}</div>
                <div className={'calendar-icon'}>{calendarIcon}</div>
            </div>
            <div className='task-detail-notes'>
                {notes}
            </div>
        </div>
    )
}

TaskDetail.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
}

export default TaskDetail;