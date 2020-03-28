import { connect } from 'react-redux';
import TaskList from '../components/TaskList'

const mapStateToProps = (state)=>{
    const selectedList = 'MDcwODg3ODM1MTgxMDkyODE2ODU6MDow';
    return {
        list: state.tasklist[selectedList]
    }

}

export default connect(mapStateToProps)(TaskList)