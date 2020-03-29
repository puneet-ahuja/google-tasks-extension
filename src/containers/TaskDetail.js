import { connect } from 'react-redux';
import TaskDetail from '../components/TaskDetail'

const mapStateToProps = (state)=>{
    const { id, title, notes } = state.tasks.selectedTask
    return {
        id,
        title,
        notes
    }
}

export default connect(mapStateToProps)(TaskDetail)