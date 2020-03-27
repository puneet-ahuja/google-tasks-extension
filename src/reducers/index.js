import { combineReducers } from 'redux';
import userDetails from './userDetails';
import tasklists from './tasklists'

export default combineReducers({
    userDetails,
    tasklists
});