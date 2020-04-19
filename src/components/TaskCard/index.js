import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { dragDropSVG } from '../../constants/svgs'
import classnames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes, DropZones } from '../../constants/dragAndDrop';


/***
 * Task Card Component to handle Drag and Drop
 */
const TaskCard = ({ task, selected, setSelectedTask, styleClass, moveTask, restoreList }) => {
    const { title, notes, id } = task

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
                key={subtask.id} 
                task={{ ...subtask }} 
                styleClass='child-task-card' 
                moveTask={moveTask}
                restoreList={restoreList}
            />)}
        </div>
    )
}

// TODO : Need to identify Selected and Set Selected Behaviour
TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    setSelectedTask: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    moveTask: PropTypes.func.isRequired,
    restoreList: PropTypes.func.isRequired
}

export default TaskCard;