import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { tripleDotSVG } from '../../constants/svgs'
import TaskCard from '../TaskCard'

const TaskList = ({listName,list}) => {
    return (
        <div className='tasklist-container'>
            <div className='task-list-header'>
                <div>{listName}</div>
                <div className='triple-dot-style'>{tripleDotSVG}</div>
            </div>
            {list.map(item=><TaskCard key={item.id} {...item}/>)}
        </div>
    )
}

TaskList.propTypes = {
    listName: PropTypes.string,
    list: PropTypes.array
}

// TODO : Need to remove these default values.
TaskList.defaultProps = {
    list: [],
    listName: 'Default Name'
}

export default TaskList;