import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { tripleDotSVG, dragDropSVG } from '../../constants/svgs'
import classnames from 'classnames'

const TaskCard = ({ item, selected, setSelectedTask }) => {
    const { title } = item
    return (
        <div className={'task-card-container'}>
            <div className='card-data'>
                <div className={'drag-drop-icon'}>{dragDropSVG}</div>
                <div className='circle'></div>
                <div 
                    className={classnames('task-card-title',
                                    {
                                        'task-card-selected':selected
                                    })} 
                    onClick={()=>{setSelectedTask({selectedTask: item})}}>
                    {title}
                </div>
            </div>
            <div className='triple-dot-style'>
                {tripleDotSVG}
            </div>
        </div>
    )
}

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    setSelectedTask: PropTypes.func.isRequired,
    selected: PropTypes.bool
}

// TODO : Need to remove Dummy Default Props
TaskCard.defaultProps = {
    id: '1',
    title: 'This is Dummy Title',
    notes: 'This is some dummy Description'
}


export default TaskCard;