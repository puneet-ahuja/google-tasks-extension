import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { calendarIcon } from '../../constants/svgs'

const TaskDetail = ({id,title,description}) => {
    return (
        <div className={'task-detail-container'}>
            <div className='task-detail-header'>
                <div>{title}</div>
                <div className={'calendar-icon'}>{calendarIcon}</div>
            </div>
            <div className='task-detail-description'>
                {description}
            </div>
        </div>
    )
}

TaskDetail.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}
// TODO : Need to remove default Values of These.
TaskDetail.defaultProps = {
    id: '1',
    title: 'This is Dummy Title',
    description: 'This is some dummy Description'
}


export default TaskDetail;