import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const CancelButton = ({ text, onClick, styleClasses }) => {
  
    return (
      <span 
        className={classnames('cancel-button',{
            styleClasses
        })}
        onClick={onClick}
      >
        {text} 
      </span>
    );
  }

  CancelButton.propTypes = {
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      styleClasses: PropTypes.string 
  }

  export default CancelButton;