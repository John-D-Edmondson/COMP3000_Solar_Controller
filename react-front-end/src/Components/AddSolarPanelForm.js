import React, { useState } from 'react';
import { isValidPanelId } from '../helper/regex';

const AddSolarPanelForm = ({ onSubmit, onCancel }) => {
    const [panelId, setPanelId] = useState('');
    const [validPanelId, setValidPanelId] = useState(true);
  
    const handleChange = (e) => {
      const { value } = e.target;
      setPanelId(value);
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        let validForm = true;
        const panelIdCheck =isValidPanelId(panelId);
        console.log(panelIdCheck);
        if(panelIdCheck) {
            onSubmit(panelId);
            onCancel();
            setValidPanelId(true);
        } else {
            setValidPanelId(false);
            validForm = false;
            setPanelId('');
        }
    };
  
    const handleCancel = () => {
      setPanelId('');
      onCancel();
    };
  
    return (
      <form onSubmit={handleSubmit}>
          <h3>Add Solar Panel</h3>
        <div>
        <label htmlFor='inputId'>ID Number:</label>
          <input
            placeholder='Solar Panel ID'
            id='inputId'
            className='form-control'
            type="text" 
            name="panelId" 
            value={panelId}
            onChange={handleChange}
            required 
          />
        </div>
        {!validPanelId && <p style={{ color: 'red' }}>Must be Valid panel ID</p>}

        <button className="btn btn-primary" type="submit">Add</button>
        <button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button>
      </form>
    );
  };


export default AddSolarPanelForm;