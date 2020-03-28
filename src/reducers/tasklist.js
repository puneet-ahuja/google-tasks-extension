export default (state = {}, action) => {
    switch (action.type) {
      case 'SET_TASKLIST':
        return {
            ...state,
          [action.listId]:action.list
    }
      default:
        return state
    }
  }
  