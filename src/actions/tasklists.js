export const setTasklists = (lists)=>{
    return{
        type:'SET_TASKLISTS',
        lists
    } 
}

export const setSelectedList = (selectedList)=>{
    return{
        type:'SET_SELECTED_LIST',
        selectedList
    } 
}