import React from 'react';
import './index.css'
import PropTypes from 'prop-types'

const Button = ({ title, onButtonClick }) => {

    return (
      <div 
        className='drop-down-button'
        onClick={onButtonClick}>
          {title}
      </div>
    );
  }

  Button.propTypes = {
      onButtonClick : PropTypes.func.isRequired,
      title: PropTypes.string.isRequired
  }

  export default Button;