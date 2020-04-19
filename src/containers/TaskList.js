import { connect } from 'react-redux';
import TaskList from '../components/TaskList'
import { setSelectedTask } from '../actions/tasks';
import { setTasklist } from '../actions/tasklist'

const mapStateToProps = (state)=>{
    const { tasklists: { selectedList: {id: selectedListId} }} = state;
    return {
        list: state.tasklist[selectedListId],
        listTitle: state.tasklists.selectedList.title,
        selectedTaskId: state.tasks.selectedTask.id,
        listId : selectedListId
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTask: selectedTask => dispatch(setSelectedTask(selectedTask)),
        setTasklist: (updatedList,listId) => dispatch(setTasklist(updatedList,listId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList)