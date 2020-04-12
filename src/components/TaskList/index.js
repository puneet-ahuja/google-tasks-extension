import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { tripleDotSVG } from '../../constants/svgs'
import TaskCard from '../TaskCard'

const TaskList = ({listTitle,list, selectedTaskId, setSelectedTask}) => {

    const [ cards, setCards ] = useState([]);
    useEffect( ()=>setCards(list), [list] )


    // TODO : Need to define this function.
    const findTask = id => {
        let parentId = undefined;
        let hasSubTask = false;
        let card = {};


        return {card , parentId, hasSubTask}


    } 

    // TODO : Need to define this function
    const moveTask = (id, parentId, parentSibling) => {
        return 'moved'
    }

    return (
        <div className='tasklist-container'>
            <div className='task-list-header'>
                <div>{listTitle}</div>
                <div className='triple-dot-style'>{tripleDotSVG}</div>
            </div>
            {cards.map(task=><TaskCard 
                                key={task.id}
                                task={task}
                                selected={selectedTaskId === task.id}
                                setSelectedTask={setSelectedTask}
                                moveTask={moveTask}
                                findTask={findTask}
                            />
                    )
            }
        </div>
    )
}

TaskList.propTypes = {
    listTitle: PropTypes.string,
    list: PropTypes.array,
    selectedTaskId: PropTypes.string,
    setSelectedTask: PropTypes.func.isRequired
}

TaskList.defaultProps = {
    list: []
}

export default TaskList;