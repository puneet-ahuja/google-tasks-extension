import { connect } from 'react-redux';
import TaskDetail from '../components/TaskDetail'
import { setTasklist } from '../actions/tasklist'

const mapStateToProps = (state)=>{
    const task = state.tasks.selectedTask;
    const {id: listId } = state.tasklists.selectedList;
    const tasklist = state.tasklist[listId]
    return {
        task,
        listId,
        tasklist
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTasklist: (list, listId) => dispatch(setTasklist(list, listId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)