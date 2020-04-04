export default (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_DETAILS':
        return {
            ...action.userDetails
        }
      default:
        return state
    }
  }
  