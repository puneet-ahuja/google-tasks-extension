const initialState = {
    selectedTask: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_TASK':
        return {
          ...state,
          selectedTask:action.selectedTask
        }
      default:
        return state
    }
  }
  