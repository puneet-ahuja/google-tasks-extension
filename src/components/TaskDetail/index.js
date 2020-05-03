import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { calendarIcon } from '../../constants/svgs';
import TaskDetailPlaceHolder from './components/TaskDetailPlaceHolder';
import TextArea from '../../components/CommonComponents/TextArea';
import DateTimePicker from 'react-datetime-picker';
import { updateTask as updateTaskAPI } from '../../GoogleAPI'
import { updateTaskList } from './utils'
import { DESCRIPTION_ICON_IMAGE } from './constants'

const TaskDetail = ({task, listId, tasklist, setTasklist}) => {

    const { id, title, notes } = task;

    const [ showDateTimePicker, setShowDateTimePicker ]= useState(false);

    // TODO : P5 : Need to update this value. Good naming required.
    const updateTask = updateValues => {
        const updatedTask = { ...task, ...updateValues }

        updateTaskAPI(listId, id, updatedTask ).then(({status})=>{
            if(status === 200){
                const updatedTasklist = updateTaskList(tasklist, updatedTask)
                setTasklist( updatedTasklist, listId)
            }
            
        }
        )
    }

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
                <div className='task-detail-description-header'>
                    <img src={DESCRIPTION_ICON_IMAGE} alt='Description Icon' className='task-detail-description-icon'/>
                    <div className='task-detail-description-title'>Description</div>
                </div>
                <TextArea
                    value={notes}
                    onBlur={(value)=>updateTask({notes:value})}
                    className='task-detail-description'
                    fontSize={14}
                    placeholder={'Add details'}
                    id={id}
                />
            </div>
        </div>
    )
}

TaskDetail.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        notes: PropTypes.string,
    }),
    listId: PropTypes.string.isRequired,
    setTasklist: PropTypes.func.isRequired,
    tasklist: PropTypes.array
}

TaskDetail.defaultProps = {
    tasklist: []
}

export default TaskDetail;