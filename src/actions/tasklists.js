export const setTasklists = (lists)=>{
    return{
        type:'SET_TASKLISTS',
        lists
    } 
}

export const setSelectedList = selectedList => {
    return{
        type:'SET_SELECTED_LIST',
        selectedList
    } 
}

export const insertTasklist = taskList => {
    return {
        type: 'INSERT_TASK_LIST',
        taskList
    }
}

export const removeTaskList = id => {
    return {
        type: 'REMOVE_TASK_LIST',
        id
    }
}


export const updateListStatus = (id,status) => {
    return {
        type: 'UPDATE_TASK_LIST_STATUS',
        id,
        status
    }
}