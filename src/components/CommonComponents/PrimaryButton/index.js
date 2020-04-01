import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const PrimaryButton = ({ text, onClick, styleClasses }) => {
  
    return (
      <span 
        className={classnames('primary-button',{
            styleClasses
        })}
        onClick={onClick}
      >
        {text} 
      </span>
    );
  }

  PrimaryButton.propTypes = {
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      styleClasses: PropTypes.string 
  }

  export default PrimaryButton;