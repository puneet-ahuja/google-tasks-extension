import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { tripleDotSVG } from '../../constants/svgs';
import TaskCard from '../TaskCard';
import DropDown from '../DropDown';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/dragAndDrop';
import { findCardDetails, 
    removeTask, 
    insertTask, 
    canMove 
} from './utils';
import { reorderTask } from '../../GoogleAPI'

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
    useEffect( ()=>setCards(list), [list] )
    const [ showDropdown, setShowDropdown ] = useState(false);

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
        return findCardDetails(list, id)
    } 

    const moveTask = (sourceId, targetId, zone) => {
        const sourceDetails = findTask(sourceId);
        const targetDetails = findTask(targetId)

        const { status, parentId, parentSibling } = canMove(sourceDetails,targetDetails,zone);
       
        if(status){
            parent = parentId;
            previous = parentSibling;
            const tasks = [ ...list ];
            const { removedTask, tasks:tasksAfterRemoval } = removeTask(tasks,sourceDetails.card.id);
            const cardsAfterInsertion = insertTask(tasksAfterRemoval, removedTask, parentId, parentSibling)
            setCards(cardsAfterInsertion);
        }
    }

    const restoreList = () => {
        setTasklist([...list],listId)
        parent = null;
        previous = null;
    }

    return (
        <div className='tasklist-container' ref={ drop }>
            <div className='task-list-header'>
                <div>{listTitle}</div>
                <div className='triple-dot-style' onClick={()=>setShowDropdown(true)}>{tripleDotSVG}</div>
                {showDropdown && <DropDown onCloseDropdown={()=>setShowDropdown(false)} />}
            </div>
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