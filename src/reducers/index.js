import { combineReducers } from 'redux';
import userDetails from './userDetails';
import tasklists from './tasklists'
import tasklist from './tasklist'

export default combineReducers({
    userDetails,
    tasklists,
    tasklist
});