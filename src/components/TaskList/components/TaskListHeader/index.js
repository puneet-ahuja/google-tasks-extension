import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { tripleDotSVG } from '../../../../constants/svgs';
import DropDown from '../../../DropDown';

const TaskListHeader = ({ 
    listTitle,
    onAddClick
}) => {

    const [ showDropdown, setShowDropdown ] = useState(false);
    
    return (
        <div className='task-list-header'>
                <div>{listTitle}</div>
                <div className='task-list-header-btn-cont'>
                    <div onClick={onAddClick}> + </div>
                    <div className='triple-dot-style' onClick={()=>setShowDropdown(true)}>{tripleDotSVG}</div>
                    {showDropdown && <DropDown onCloseDropdown={()=>setShowDropdown(false)} />}
                </div>
            </div>
    )
}

TaskListHeader.propTypes = {
    listTitle: PropTypes.string,
    onAddClick: PropTypes.func.isRequired
}

export default TaskListHeader;