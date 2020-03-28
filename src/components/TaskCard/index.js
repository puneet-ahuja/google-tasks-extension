import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import { tripleDotSVG, dragDropSVG } from '../../constants/svgs'

const TaskCard = ({id,title,description}) => {
    return (
        <div className={'task-card-container'}>
            <div className='card-data'>
                <div className={'drag-drop-icon'}>{dragDropSVG}</div>
                <div className='circle'></div>
                {title}
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
    description: PropTypes.string.isRequired
}

// TODO : Need to remove Dummy Default Props
TaskCard.defaultProps = {
    id: '1',
    title: 'This is Dummy Title',
    description: 'This is some dummy Description'
}


export default TaskCard;