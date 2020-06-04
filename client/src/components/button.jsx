import React from 'react';
import './styles/button.scss';

export const Button = (props) => {
    const { className, onClick, text } = props;

    // const btnStyles = {
    //     // background: 'red'
    //     width: '200px',
    //     padding: '10px',
    //     border: '1px solid #999',
    //     borderRadius: '5px',
    //     margin: '0 auto',
    //     fontWeight: '600'
    // }
    return (
        <div className={`${className} btn`} style={{ margin: '20px'}}>
            <button onClick={onClick}>
                {text}
            </button>
        </div>
    );
};
