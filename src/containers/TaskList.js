import { connect } from 'react-redux';
import TaskList from '../components/TaskList'

const mapStateToProps = (state)=>{
    const { tasklists: { selectedList }} = state
    return {
        list: state.tasklist[selectedList]
    }

}

export default connect(mapStateToProps)(TaskList)