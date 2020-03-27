export default (state = {}, action) => {
    switch (action.type) {
      case 'ADD_USER_DETAILS':
        return {
            ...action.userDetails
        }
      default:
        return state
    }
  }
  