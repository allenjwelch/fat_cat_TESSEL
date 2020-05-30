import React from 'react';
import './styles/input.scss';

export const Input = (props) => {
    const { className, onChange, label } = props;

    return (
        <div className={`${className} input`} >
            <h4 style={{ marginBottom: '5px' }}>{label}</h4>
            <input type="password" name="password" onChange={onChange}/>
        </div>
    );
};