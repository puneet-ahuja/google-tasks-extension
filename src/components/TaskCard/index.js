import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { dragDropSVG } from '../../constants/svgs'
import classnames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes, DropZones } from '../../constants/dragAndDrop';


/***
 * Task Card Component to handle Drag and Drop
 */
const TaskCard = ({
    task,
    selected,
    setSelectedTask,
    styleClass,
    moveTask,
    restoreList,
    editable,
    insertTask,
    selectedTaskId
}) => {
    const { title, notes, id } = task;
    // TODO : P5 : Need more grooming on this.
    /**
     * To make this editable.
     */
    const [ canEdit ] = useState(editable);
    const [ titleValue, setTitleValue ] = useState(title);

    const [{isDragging},drag,preview] = useDrag({
        item:{
            id,
            type: ItemTypes.TASK_CARD
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        end: (dropResult, monitor) => {
            // TODO : Need to handle This Working.
            // const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                restoreList()
            }
        }
    })
    const [ , dropZone1 ]= useDrop({
        accept: ItemTypes.TASK_CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
              moveTask(draggedId, id, DropZones.ZONE_1);
            }
          }
    })
    const [ , dropZone2 ]= useDrop({
        accept: ItemTypes.TASK_CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
              moveTask(draggedId, id, DropZones.ZONE_2);
            }
          }
    })
    /**
     * To update the height of the Card based on content for text area.
     */
    const [ height, setHeight ] = useState('26px');
    const getTitleHeight = (scrollHeight, lineHeight) => {
        const MAX_LINES = 5;
        const lines = (scrollHeight-4)/26;

        return (Math.min(lines, MAX_LINES) * lineHeight) + 'px';
    }

    const titleStyle = {
        height
    }

    /**
     * Funtion to set title Value and Manage Height of the TextArea
     * @param {Default Event object from browser} event 
     */
    const onChangeTextAreaHandler = event => {
        setTitleValue(event.target.value);
        if(event.target.scrollHeight){
            const newHeight = getTitleHeight(event.target.scrollHeight, 26);
            if(newHeight !== height){
                setHeight(newHeight)
            }
            
        }
    }

    /**
     * Function to store New Card.
     */
    const onBlurTextAreaHandler = () => {
        // TODO : Fetch this from constant file.
        if (id === 'new-card'){
            /**
             * Funtion to Update Task to store and Google API.
             */
            insertTask(titleValue)
        }
        
    }

    // TODO : P5 : Can Move Text Area to some other place.
    /**
     * Function to conditionally render Title in Text Area of Div
     */
    const renderTitle = () => {
        if ( canEdit ){
            return (
                <textarea
                        rows={1}
                        className='task-card-title'
                        style={titleStyle}
                        onChange={onChangeTextAreaHandler}
                        onBlur={onBlurTextAreaHandler}
                        value={titleValue}
                        placeholder={'Enter Task Here'}
                        autoFocus
                    />        
            )
        }
        else {
            return (
                <div 
                        className={classnames('task-card-title',
                                        {
                                            'task-card-selected':selected
                                        })} 
                        onClick={()=>{setSelectedTask({selectedTask: task})}}>
                        {title}
                    </div>
            )
        }
    }
    

    return (
        <div className={classnames('task-card-container', {
            'task-card-dragging': isDragging
        })} ref={preview}>
            <div className='card-data'>
                <div className={classnames('drop-zone-1', styleClass)} ref={dropZone1} >
                    <div className={'drag-drop-icon'} ref={drag}>{dragDropSVG}</div>
                    <div className='circle'></div>
                </div>
                <div className='task-details' ref={dropZone2} >
                    {renderTitle()}
                    
                    {notes && 
                    <div className='task-card-notes'>
                        {notes}
                    </div>}
                </div>
            </div>
            {task.subTasks && task.subTasks.map((subtask)=><TaskCard 
                key={subtask.id} 
                task={{ ...subtask }} 
                styleClass='child-task-card' 
                moveTask={moveTask}
                restoreList={restoreList}
                setSelectedTask={setSelectedTask}
                selected={subtask.id === selectedTaskId}
            />)}
        </div>
    )
}

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    setSelectedTask: PropTypes.func,
    selected: PropTypes.bool,
    moveTask: PropTypes.func.isRequired,
    restoreList: PropTypes.func.isRequired,
    insertTask: PropTypes.func,
    selectedTaskId: PropTypes.string.isRequired
}

TaskCard.defaultProps = {
    setSelectedTask: () => {},
    insertTask: () => {}
}
export default TaskCard;