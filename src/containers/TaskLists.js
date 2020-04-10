import { connect } from 'react-redux';
import TaskLists from '../components/TaskLists'
import { setSelectedList, setTasklists } from '../actions/tasklists'

const mapStateToProps = (state)=>{
    return {
        lists: state.tasklists.lists,
        selectedListId: state.tasklists.selectedList.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedList : (selectedList) => dispatch(setSelectedList(selectedList)),
        setTasklists : lists => dispatch(setTasklists(lists)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskLists)