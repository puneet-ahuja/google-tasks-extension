const initialState = {
  lists:[],
  selectedList: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TASKLISTS':
        const selectedList = state.selectedList.id ? state.selectedList: action.lists[0];
        return {
          ...state,
          selectedList,
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
        
      default:
        return state
    }
  }
  