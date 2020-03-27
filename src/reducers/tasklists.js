export default (state = [], action) => {
    switch (action.type) {
      case 'SET_TASKLISTS':
        return [
          ...action.lists
        ]
      default:
        return state
    }
  }
  