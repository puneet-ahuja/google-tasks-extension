import { combineReducers } from 'redux';
import userDetails from './userDetails';
import tasklists from './tasklists'
import tasklist from './tasklist'
import tasks from './tasks'

export default combineReducers({
    userDetails,
    tasklists,
    tasklist,
    tasks
});