import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select 
            id="categories" 
            className={classes.MySelect} 
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option value={defaultValue}>{defaultValue}</option>
            {options.map(option => 
                <option key={option} value={option}>
                    {option}
                </option>
            )}
        </select>
    )
};

export default MySelect;