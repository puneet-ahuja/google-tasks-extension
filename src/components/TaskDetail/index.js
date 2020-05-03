import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { calendarIcon } from '../../constants/svgs';
import TaskDetailPlaceHolder from './components/TaskDetailPlaceHolder';
import TextArea from '../../components/CommonComponents/TextArea';
import DatePicker from 'react-datepicker';
import { updateTask as updateTaskAPI } from '../../GoogleAPI'
import { updateTaskList } from './utils'
import { DESCRIPTION_ICON_IMAGE } from './constants';
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, parseISOString } from '../../utils/date';
import Tag from '../CommonComponents/Tag';

const TaskDetail = ({task, listId, tasklist, setTasklist}) => {

    const { id, title, notes, due } = task;
    let formattedDueDate = '';

    const [ showDatePicker, setShowDatePicker ]= useState(false);
    const [ selectedDate, setSelectedDate ] = useState(null)

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

    const onDateChangeHandler = date => {
        setSelectedDate(date);
        updateTask({ due: date.toISOString() })
    }

    if(due){
        formattedDueDate = formatDate(parseISOString(due));
    }

    if(!id){
        return <TaskDetailPlaceHolder />
    }
    return (
        <div className={'task-detail-container'}>
            <div className='task-detail-header'>
                <TextArea
                    value={title}
                    onBlur={(value)=>updateTask({title:value})}
                />
                <div
                    className={'calendar-icon'}
                    onClick={()=>setShowDatePicker(!showDatePicker)}
                >
                    {calendarIcon}
                </div>
            </div>
            {showDatePicker && 
                <DatePicker
                    selected={selectedDate}
                    onChange={onDateChangeHandler}
                    className={'date-time-style'}
                    placeholderText="Click to select a date"
                    dateFormat="d-MM-yyyy"
                />
            }
            {formattedDueDate && 
                <Tag
                    title={formattedDueDate}
                    showCalendarIcon
                    showCross
                    onCrossClick={()=>updateTask({due:undefined})}
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