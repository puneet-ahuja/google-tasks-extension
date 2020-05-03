import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { calendarIcon } from '../../../constants/svgs';

const Tag = ({ title, showCross, onCrossClick, classNames, showCalendarIcon }) => {

    return (
      <div className={classnames('tag-container',classNames)}>
          {showCalendarIcon && 
            <div className='tag-calendar-icon'>
                {calendarIcon}
                </div>
            }
          <div className={'tag-title'}>{title}</div>
          {showCross && <div className={'tag-cross'} onClick={onCrossClick}>X</div>}
      </div>
    );
  }

Tag.propTypes = {
    title: PropTypes.string.isRequired,
    showCross: PropTypes.bool,
    onCrossClick: PropTypes.func,
    classNames: PropTypes.string,
    showCalendarIcon: PropTypes.bool
}

Tag.defaultProps = {
    showCross: false,
    onCrossClick: () => {},
    showCalendarIcon: false
}

export default Tag;