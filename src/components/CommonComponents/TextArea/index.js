import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import classnames from 'classnames'

const TextArea = ({ onBlur, value: initialValue, placeholder, maxLines, fontSize, className, id }) => {

    // TODO : P5 : Need to verify if we can improve performance of this max lines.
    const MAX_LINES = maxLines;
    const [ height, setHeight ] = useState('');
    const [ value, setValue] = useState('');
    const lineHeight = fontSize + 4;

    /**
     * Effect to restore the size and content of 
     */
    useEffect(
        () => {
            setValue(initialValue);
            setHeight('');
        },
        [initialValue, id]
    )

    const ref = useRef(null);
    
    const getHeight = (scrollHeight, lineHeight) => {
        const lines = (scrollHeight-4)/lineHeight;

        return (Math.min(lines, MAX_LINES) * lineHeight) + 'px';
    }

    const onChange = event => {
        setValue(event.target.value);
    }

    const onValueChange = () => {
        if(ref.current.scrollHeight){
            const newHeight = getHeight(ref.current.scrollHeight, lineHeight);
            if(newHeight !== height){
                setHeight(newHeight)
            }
        }
    }
    useEffect(
        onValueChange,
        [value]
    )

    const textAreaStyle = {
        height,
        fontSize: fontSize+'px',
    }

  
    return (
      <textarea
        ref={ref}
        rows={1}
        className={classnames('text-area',className)}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={textAreaStyle}
        onBlur={() => onBlur(value)}
      />
    );
  }

  TextArea.propTypes = {
        onBlur: PropTypes.func.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        maxLines: PropTypes.number,
        fontSize: PropTypes.number,
        className: PropTypes.string,
        id: PropTypes.string
  }

  TextArea.defaultProps = {
        value: '',
        placeholder: '',
        maxLines: Number.MAX_VALUE,
        fontSize: 22
  }

  export default TextArea;