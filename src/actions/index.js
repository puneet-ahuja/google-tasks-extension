export const setTasklists = (lists)=>{
    return{
        type:'SET_TASKLISTS',
        lists
    }
    
}

export const setTasklist = (list, listId)=>{
    return{
        type:'SET_TASKLIST',
        list,
        listId
    }
    
}
