import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const PrimaryButton = ({ text, onClick, styleClasses , enabled }) => {

  const onClickHandler = () =>{
    enabled && onClick()
  }
  
    return (
      <span 
        className={classnames('primary-button',{
            'disabled-primary-button': !enabled,
            'enabled-primary-button': enabled,
            styleClasses
        })}
        onClick={onClickHandler}
      >
        {text} 
      </span>
    );
  }

  PrimaryButton.propTypes = {
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      styleClasses: PropTypes.string,
      enabled: PropTypes.bool
  }

  PrimaryButton.defaultProps = {
    enabled: true
  }

  export default PrimaryButton;