import React from 'react';
import './index.css'
import PropTypes from 'prop-types'
import PrimaryButton from '../CommonComponents/PrimaryButton'
import CancelButton from '../CommonComponents/CancelButton';

const AddListForm = ({isSighnedIn,dispatch}) => {
  
    return (
      <div className='add-list-form-container'>
          <input type='text' className='add-list-input'/>
          <div className='add-list-buttons-container'>
            <PrimaryButton text={'Save'} onClick={()=>console.log('Save Button Clicked')}></PrimaryButton>
            <CancelButton text={'Cancel'} onClick={()=>console.log('Save Button Clicked')}></CancelButton>
          </div>
    </div>
    );
  }

  AddListForm.propTypes = {
      onSaveClick : PropTypes.func.isRequired,
      onCancelClick: PropTypes.func.isRequired
  }

  export default AddListForm;