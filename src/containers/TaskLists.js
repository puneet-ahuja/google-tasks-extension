import { connect } from 'react-redux';
import TaskLists from '../components/TaskLists'
import { setSelectedList, updateListStatus } from '../actions/tasklists'

const mapStateToProps = (state)=>{
    return {
        lists: state.tasklists.lists,
        selectedListId: state.tasklists.selectedList.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedList : (selectedList) => dispatch(setSelectedList(selectedList)),
        updateListStatus : (id, status) => dispatch(updateListStatus(id, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskLists)