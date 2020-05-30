import React from 'react';
import './styles/dropdown.scss';

export const DropDown = (props) => {
    const { className, onChange, defaultValue, label } = props;

    return (
        <div className={`${className} dropdown`} >
            <h4>{label}</h4>
            <div className="custom-dropdown">
                <select onChange={onChange} value={defaultValue}>
                    <option value='normal'>Normal</option>
                    <option value='extra'>Extra</option>
                    <option value='snack'>Snack</option>
                </select>
            </div>
        </div>
    );
};
