import { connect } from 'react-redux';
import TaskList from '../components/TaskList'
import { setSelectedTask } from '../actions/tasks';

const mapStateToProps = (state)=>{
    const { tasklists: { selectedList: {id: selectedListId} }} = state;
    return {
        list: state.tasklist[selectedListId],
        listTitle: state.tasklists.selectedList.title,
        selectedTaskId: state.tasks.selectedTask.id
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTask: (selectedTask) => {dispatch(setSelectedTask(selectedTask))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList)