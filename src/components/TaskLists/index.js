import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTasklist } from '../../GoogleAPI';
import './index.css'
import { tripleDotSVG, dragDropSVG } from '../../constants/svgs'

const defaultList = [
    {
        kind: "tasks#taskList",
        id: "MTYzNjY4MzcyMjI0MDIyNzE5NDQ6MDow",
        etag: "LTEzMDQ0NzIyMDk",
        title: "My Tasks",
        updated: "2019-07-02T10:33:43.227Z",
        selfLink: "https://www.googleapis.com/tasks/v1/users/@me/lists/MTYzNjY4MzcyMjI0MDIyNzE5NDQ6MDow"
    },
    {
        kind: "tasks#taskList",
        id: "MTYzNjY4MzcyMjI0MDIyNzE5NDQ6OTg3NTIyNDc2Njc0NzAyODow",
        etag: "LTEzMDQ0NzIyMDk",
        title: "My List",
        updated: "2019-07-02T10:33:43.227Z",
        selfLink: "https://www.googleapis.com/tasks/v1/users/@me/lists/MTYzNjY4MzcyMjI0MDIyNzE5NDQ6OTg3NTIyNDc2Njc0NzAyODow"
    },
    {
        kind: "tasks#taskList",
        id: "MTYzNjY4MzcyMjI0MDIyNzE5NDQ6MjEzNTcyODgzMzgyNzcyNTow",
        etag: "LTEzMDQ0NzIyMDk",
        title: "Personal",
        updated: "2019-07-02T10:33:43.227Z",
        selfLink: "https://www.googleapis.com/tasks/v1/users/@me/lists/MTYzNjY4MzcyMjI0MDIyNzE5NDQ6MjEzNTcyODgzMzgyNzcyNTow"
    }
]

const ListElement = ({title}) =>{
    return (
        <div className={'list-element'}>
            <div className='list-data'>
                <div className={'drag-drop-icon'}>{dragDropSVG}</div>
                {title}
            </div>
            <div className='triple-dot-style'>
                {tripleDotSVG}
            </div>
        </div>
    )
}

// TODO : Will change selected element on the basis of click.

const TaskLists = ({lists}) => {

    useEffect(() => {
        if(lists && lists.length){
            const listId = lists[0].id;
            getTasklist({listId});
        }
    },[lists]);

    return (
        <div className='tasklists-container'>
            <div className='task-lists-header'>
                <div className='button-style'>Create New List</div>
            </div>
            {lists.map((listDetails)=><ListElement key={listDetails.id} {...listDetails} />)}
        </div>
    )
}

TaskLists.propTypes = {
    lists: PropTypes.array
}

TaskLists.defaultProps = {
    lists: defaultList
}


export default TaskLists;
