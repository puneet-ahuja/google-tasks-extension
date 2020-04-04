import { connect } from 'react-redux';
import Header from '../components/Header'

const mapStateToProps = state => {
    return {
        isSignedIn : state.userDetails.isSignedIn
    }
}

export default connect(mapStateToProps)(Header)