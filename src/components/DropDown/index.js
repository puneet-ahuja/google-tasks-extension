import React from 'react';
import './index.css'
import PropTypes from 'prop-types'
import Button from './Button'

const DropDown = ({ items, onCloseDropdown }) => {

    return (
        <React.Fragment>
            <div className='drop-down-overlay' onClick={onCloseDropdown}></div>
            <div className='drop-down-container' >
                {items.map( (buttonInfo,index) => <Button key={index} {...buttonInfo}/> )}
            </div>
        </React.Fragment>
    );
  }

  DropDown.propTypes = {
    onCloseDropdown : PropTypes.func.isRequired,
    items : PropTypes.array.isRequired
  }

  // TODO : Need to delete this item when original Data is Available
  DropDown.defaultProps = {
      items: [
          {
              title: 'Option 1',
              onButtonClick: () => console.log('Option 1 Clicked')
          },
          {
            title: 'Option 2',
            onButtonClick: () => console.log('Option 2 Clicked')
        },
        {
            title: 'Option 3',
            onButtonClick: () => console.log('Option 3 Clicked')
        },{
            title: 'Option 4',
            onButtonClick: () => console.log('Option 4 Clicked')
        },
        {
            title: 'Option 5',
            onButtonClick: () => console.log('Option 5 Clicked')
        }
      ]
  }

  export default DropDown;