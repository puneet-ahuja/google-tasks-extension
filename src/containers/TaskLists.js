import { connect } from 'react-redux';
import TaskLists from '../components/TaskLists'

const mapStateToProps = (state)=>{
    return {
        lists: state.tasklists
    }

}

export default connect(mapStateToProps)(TaskLists)