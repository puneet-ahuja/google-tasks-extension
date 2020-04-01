import React, { useState } from 'react';
import './index.css'
import PropTypes from 'prop-types'
import PrimaryButton from '../CommonComponents/PrimaryButton'
import CancelButton from '../CommonComponents/CancelButton';

const AddListForm = ({ onSaveClick, onCancelClick }) => {

    const [ listName, setListName ] = useState('')

    const enableSave = listName.length > 0;

    const inputChangeHandler = ( event ) => {
        setListName(event.target.value);
    }

    const saveClickHandler = () => {
        onSaveClick && onSaveClick(listName);
        setListName('');
        onCancelClick && onCancelClick();
    }
  
    return (
      <div className='add-list-form-container'>
          <input type='text' className='add-list-input' value={listName} placeholder={'Write List Name'} onChange={inputChangeHandler}/>
          <div className='add-list-buttons-container'>
            <PrimaryButton text={'Save'} onClick={saveClickHandler} enabled={enableSave}></PrimaryButton>
            <CancelButton text={'Cancel'} onClick={onCancelClick}></CancelButton>
          </div>
    </div>
    );
  }

  AddListForm.propTypes = {
      onSaveClick : PropTypes.func.isRequired,
      onCancelClick: PropTypes.func.isRequired
  }

  export default AddListForm;