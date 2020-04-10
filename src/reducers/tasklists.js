const initialState = {
  lists:[],
  selectedList: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TASKLISTS':
        return {
          selectedList: action.lists[0],
          lists: action.lists
        }

      case 'SET_SELECTED_LIST':
        return {
          ...state,
          selectedList: action.selectedList
        }

      case 'INSERT_TASK_LIST':
        return {
          ...state,
          lists: [action.taskList, ...state.lists]
        }

      case 'UPDATE_TASK_LIST_STATUS':
        const {id: selectedId, status} = action
        return {
          ...state,
          lists : state.lists.map(item=>{
            const { id } = item
            return id === selectedId? {...item,status}: item; 
          })
        }
        
      default:
        return state
    }
  }
  