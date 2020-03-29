import { connect } from 'react-redux';
import TaskList from '../components/TaskList'

const mapStateToProps = (state)=>{
    const { tasklists: { selectedList: {id: selectedListId} }} = state
    return {
        list: state.tasklist[selectedListId],
        listTitle: state.tasklists.selectedList.title
    }

}

export default connect(mapStateToProps)(TaskList)