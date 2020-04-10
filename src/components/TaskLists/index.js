import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getTasklist, addTaskList } from '../../GoogleAPI';
import './index.css'
import AddListForm from '../AddListForm';
import { useDrop } from 'react-dnd';
import ListCard from '../ListCard'
import { ItemTypes } from '../../constants/dragAndDrop'
import update from "immutability-helper";

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

const TaskLists = ({lists,selectedListId, setSelectedList, setTasklists}) => {

    const [ cards, setCards ] = useState([]);

    useEffect(()=>setCards(lists),[lists]);
    useEffect(() => {
        selectedListId && getTasklist({listId:selectedListId});
    },[selectedListId]);

    const [ showAddListForm, setShowAddListForm ] = useState(false);

    const [, drop] = useDrop({ 
        accept: ItemTypes.LIST_CARD,
        drop: () => setTasklists(cards)
     });

    const toggleShowAddListForm = () => {
        setShowAddListForm(!showAddListForm);
    }

    const hideAddListForm = () => {
        setShowAddListForm(false);
    }

    const addListHandler = listName => {
        addTaskList(listName);
    }

    const moveCard = (id, atIndex) => {
        const { card, index } = findCard(id);
        setCards(
          update(cards, {
            $splice: [[index, 1], [atIndex, 0, card]]
          })
        );
      };
    
    
      /***
       * Function to find a card
       */
      const findCard = id => {
        const card = cards.filter(c => `${c.id}` === id)[0];
        return {
          card,
          index: cards.indexOf(card)
        };
      };

    const renderListElement = () => {
        
        return cards.map(({status,...listDetails})=> <ListCard key={listDetails.id} listDetails={listDetails} selected={selectedListId === listDetails.id} setSelectedList={setSelectedList} moveCard={moveCard} findCard={findCard} />)
    }

    return (
        <div className='tasklists-container' ref={drop}>
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
    setTasklists: PropTypes.func.isRequired
}

TaskLists.defaultProps = {
    lists: defaultList,
}


export default TaskLists;
