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

    const [, drop] = useDrop({ 
        accept: ItemTypes.TASK_CARD,
        drop: () => setTasklist(cards, listId)
     });


    const findTask = id => {
        return findCardDetails(cards, id)
    } 

    const moveTask = (sourceId, targetId, zone) => {
        const sourceDetails = findTask(sourceId);
        const targetDetails = findTask(targetId)

        const { status, parentId, parentSibling } = canMove(sourceDetails,targetDetails,zone)
       
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