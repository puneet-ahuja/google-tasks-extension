import React from 'react';
import './index.css'
import PropTypes from 'prop-types'
import { handleAuthClick, handleSignoutClick } from '../../GoogleAPI'


const Header = ({isSighnedIn,dispatch}) => {
  
    return (
      <div className='header-container'>
        <div className='left-menu'>
            <img src='https://www.gstatic.com/images/branding/product/1x/tasks_96dp.png' alt='Google Tasks Logo' className='logo-style'/>
            <div className='title-style'>Google Tasks</div>

        </div>
        {isSighnedIn?<div className='button-style' onClick={handleSignoutClick}>Log Out</div>:<div className='button-style' onClick={(event)=> handleAuthClick(event,dispatch)}>Sign In</div>}
      </div>
    );
  }

  Header.propTypes = {
      isSighnedIn: PropTypes.bool
  }

  Header.defaultProps = {
    isSighnedIn: false
  };

  export default Header;