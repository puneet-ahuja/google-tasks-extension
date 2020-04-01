import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getTasklist } from '../../GoogleAPI';
import './index.css'
import { tripleDotSVG, dragDropSVG } from '../../constants/svgs'
import classnames from 'classnames'
import AddListForm from '../AddListForm';

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

const ListElement = ({listDetails, selectedListId, setSelectedList}) =>{
    const { title, id } = listDetails
    const selected = id === selectedListId;
    return (
        <div className={'list-element'}>
            <div className='list-data'>
                <div className={'drag-drop-icon'}>{dragDropSVG}</div>
                <div 
                    className={classnames('tasklists-title',{"selected-title":selected})}
                    onClick={()=>setSelectedList(listDetails)}
                >{title}</div>
            </div>
            <div className='triple-dot-style'>
                {tripleDotSVG}
            </div>
        </div>
    )
}


const TaskLists = ({lists,selectedListId, setSelectedList}) => {

    useEffect(() => {
        selectedListId && getTasklist({listId:selectedListId});
    },[selectedListId]);

    return (
        <div className='tasklists-container'>
            <div className='task-lists-header'>
                <div className='button-style'>Create New List</div>
            </div>
            <AddListForm/>
            {lists.map((listDetails)=><ListElement key={listDetails.id} listDetails={listDetails} selectedListId={selectedListId} setSelectedList={setSelectedList}/>)}
        </div>
    )
}

TaskLists.propTypes = {
    lists: PropTypes.array,
    selectedListId: PropTypes.string,
    setSelectedList: PropTypes.func.isRequired
}

TaskLists.defaultProps = {
    lists: defaultList
}


export default TaskLists;
