import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { calendarIcon } from '../../constants/svgs';
import TaskDetailPlaceHolder from './components/TaskDetailPlaceHolder';
import TextArea from '../../components/CommonComponents/TextArea';
import DateTimePicker from 'react-datetime-picker';

const TaskDetail = ({id,title,notes}) => {

    const [ showDateTimePicker, setShowDateTimePicker ]= useState(false);

    if(!id){
        return <TaskDetailPlaceHolder />
    }
    return (
        <div className={'task-detail-container'}>
            <div className='task-detail-header'>
                <TextArea
                    value={title}
                    onBlur={()=>console.log('On Blur Called Here')}
                />
                <div
                    className={'calendar-icon'}
                    onClick={()=>setShowDateTimePicker(!showDateTimePicker)}
                >
                    {calendarIcon}
                </div>
            </div>
            {showDateTimePicker && 
                <DateTimePicker
                    onChange={()=>console.log('Date Time changed')}
                    className={'date-time-style'}
                />
            }
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