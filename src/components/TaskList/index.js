import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { tripleDotSVG } from '../../constants/svgs'
import TaskCard from '../TaskCard'

const TaskList = ({listTitle,list}) => {
    return (
        <div className='tasklist-container'>
            <div className='task-list-header'>
                <div>{listTitle}</div>
                <div className='triple-dot-style'>{tripleDotSVG}</div>
            </div>
            {list.map(item=><TaskCard key={item.id} {...item}/>)}
        </div>
    )
}

TaskList.propTypes = {
    listTitle: PropTypes.string,
    list: PropTypes.array
}

TaskList.defaultProps = {
    list: []
}

export default TaskList;