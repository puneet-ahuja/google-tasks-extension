import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getTasklist, addTaskList } from '../../GoogleAPI';
import './index.css'
import { tripleDotSVG, dragDropSVG } from '../../constants/svgs'
import classnames from 'classnames'
import AddListForm from '../AddListForm';
import { useDrag } from 'react-dnd';
import { ItemTypes, CardStatus } from '../../constants/dragAndDrop'

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

const EmptyListComponent = () => {
    return <div className='empty-list-element'>
        </div>
}

const ListElement = ({listDetails, selectedListId, setSelectedList, updateListStatus}) =>{
    const { title, id } = listDetails
    const selected = id === selectedListId;
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.LIST_CARD },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      })

    if (isDragging){
        updateListStatus(id , CardStatus.IS_DRAGGING);
    }
    return (
        <div className={classnames('list-element',{'list-element-dragging':isDragging})} ref={drag}>
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




const TaskLists = ({lists,selectedListId, setSelectedList, updateListStatus}) => {

    useEffect(() => {
        selectedListId && getTasklist({listId:selectedListId});
    },[selectedListId]);

    const [ showAddListForm, setShowAddListForm ] = useState(false);

    const toggleShowAddListForm = () => {
        setShowAddListForm(!showAddListForm);
    }

    const hideAddListForm = () => {
        setShowAddListForm(false);
    }

    const addListHandler = listName => {
        addTaskList(listName);
    }

    const renderListElement = () => {
        
        return lists.map(({status,...listDetails})=> {
            switch(status){
                case CardStatus.IS_DRAGGING:
                    return <EmptyListComponent/>;
                default :
                    return<ListElement key={listDetails.id} listDetails={listDetails} selectedListId={selectedListId} setSelectedList={setSelectedList} updateListStatus={updateListStatus} />;
            }
        }
        )
    }

    return (
        <div className='tasklists-container'>
            <div className='task-lists-header'>
                <div className='button-style' onClick={toggleShowAddListForm}>Create New List</div>
            </div>
            {showAddListForm && 
                <AddListForm
                    onCancelClick={hideAddListForm}
                    onSaveClick={addListHandler}
                />
            }
            {renderListElement()}
        </div>
    )
}

TaskLists.propTypes = {
    lists: PropTypes.array,
    selectedListId: PropTypes.string,
    setSelectedList: PropTypes.func.isRequired,
    updateListStatus: PropTypes.func.isRequired
}

TaskLists.defaultProps = {
    lists: defaultList,
}


export default TaskLists;
