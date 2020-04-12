import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { dragDropSVG } from '../../constants/svgs'
import classnames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../constants/dragAndDrop';


/***
 * Task Card Component to handle Drag and Drop
 */
const TaskCard = ({ task, selected, setSelectedTask, hasChild, styleClass, findTask, moveTask }) => {
    const { title, notes, id } = task

    const [{isDragging},drag,preview] = useDrag({
        item:{
            draggedId: id,
            type: ItemTypes.TASK_CARD
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        end: (dropResult, monitor) => {
            // const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                /**
                 * Mave Card to to original Position.
                 */
            // TODO : Need to call this function. write way.
            // moveCard(droppedId, originalIndex);
            }
        }
    })
    const [ , drop ]= useDrop({
        accept: ItemTypes.TASK_CARD,
        drop: () => false
    })
    return (
        <div className={classnames('task-card-container', styleClass, {
            'task-card-dragging': isDragging
        })} ref={node => preview(drop(node))}>
            <div className='card-data'>
                <div className={'drag-drop-icon'} ref={drag}>{dragDropSVG}</div>
                <div className='circle'></div>
                <div className='task-details'>
                    <div 
                        className={classnames('task-card-title',
                                        {
                                            'task-card-selected':selected
                                        })} 
                        onClick={()=>{setSelectedTask({selectedTask: task})}}>
                        {title}
                    </div>
                    {notes && 
                    <div className='task-card-notes'>
                        {notes}
                    </div>}
                </div>
            </div>
            {task.subTasks && task.subTasks.map((subtask)=><TaskCard 
                key={subtask.id} task={{ ...subtask }} styleClass='child-task-card'/>)}
        </div>
    )
}

// TODO : Need to redefine Proptypes
TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    setSelectedTask: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    findTask: PropTypes.func.isRequired,
    moveTask: PropTypes.func.isRequired
}

// TODO : Need to remove Dummy Default Props
TaskCard.defaultProps = {
    id: '1',
}


export default TaskCard;