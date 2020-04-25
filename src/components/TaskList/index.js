import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import TaskCard from '../TaskCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/dragAndDrop';
import { findCardDetails, 
    removeTask, 
    insertTask, 
    canMove 
} from './utils';
import { reorderTask } from '../../GoogleAPI';
import TaskListHeader from './components/TaskListHeader';
import { insertTaskAPI } from '../../GoogleAPI'

let parent = null;
let previous = null;

const TaskList = ({ 
    listTitle,
    list,
    listId,
    selectedTaskId,
    setSelectedTask,
    setTasklist
}) => {
    const [ cards, setCards ] = useState([]);
    const [ showNewTaskCard, setShowNewTaskCard ] = useState(false);
    useEffect( ()=>setCards(list), [list] )
    const onDropHandler = (item) => {
        const { id: draggedId } = item
        setTasklist(cards, listId);
        reorderTask(draggedId, listId, parent, previous);
        parent = null;
        previous = null;
    }

    const [, drop] = useDrop({ 
        accept: ItemTypes.TASK_CARD,
        drop: onDropHandler
     });


    const findTask = id => {
        return findCardDetails(cards, id)
    } 

    const moveTask = (sourceId, targetId, zone) => {
        const sourceDetails = findTask(sourceId);
        const targetDetails = findTask(targetId)

        const { status, parentId, parentSibling } = canMove(sourceDetails,targetDetails,zone);
        parent = parentId;
        previous = parentSibling;
       
        if(status){
            const tasks = [ ...cards ];
            const { removedTask, tasks:tasksAfterRemoval } = removeTask(tasks,sourceDetails.card.id);
            const cardsAfterInsertion = insertTask(tasksAfterRemoval, removedTask, parentId, parentSibling)
            setCards(cardsAfterInsertion);
        }
    }

    const restoreList = () => {
        setTasklist([...list],listId)
    }

    const insertNewTask = title => {
        /**
         * Sending Request to API
         */
        insertTaskAPI(listId, title).then( ({status,result: cardToInsert = {}}) => {
            if(status === 200){
                const cardsAfterInsertion = insertTask(list, cardToInsert);
                /**
                 * Update Store with the new Task.
                 */
                setTasklist(cardsAfterInsertion, listId);
                /**
                 * Hide New Task Card.
                 */
                setShowNewTaskCard(false);
            }
        })
    }

    const onAddClick = () => {
        /**
         * Show Add Task Card.
         */
        setShowNewTaskCard(true);
    }
    // TODO : P5 : Can create new Component for New Task Card.
    return (
        <div className='tasklist-container' ref={ drop }>
            <TaskListHeader 
                listTitle={listTitle}
                onAddClick={onAddClick}
                />
            {showNewTaskCard &&
                <TaskCard
                    editable
                    task={{
                        title:'',
                        notes:'',
                        id:'new-card'
                    }}
                    insertTask={insertNewTask}
                />
            }
            {cards.map(task=><TaskCard 
                                key={task.id}
                                task={task}
                                selected={selectedTaskId === task.id}
                                setSelectedTask={setSelectedTask}
                                moveTask={moveTask}
                                restoreList={restoreList}
                            />
                    )
            }
        </div>
    )
}

TaskList.propTypes = {
    listTitle: PropTypes.string,
    list: PropTypes.array,
    listId: PropTypes.string.isRequired,
    selectedTaskId: PropTypes.string,
    setSelectedTask: PropTypes.func.isRequired,
    setTasklist: PropTypes.func.isRequired,   
}

TaskList.defaultProps = {
    list: []
}

export default TaskList;