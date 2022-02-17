import React from 'react';
import { Loader } from './loader';
import './styles/button.scss';

export const Button = (props) => {
    const { className, onClick, status } = props;

    const displayText = () => {
		if (status === 'Ready') {
			return 'Feed'
		} else if (status === 'Complete') {
			return 'Done!'
		} else {
			return <Loader />
		}
	};

    return (
        <div className={`${className} ${status !== 'Ready' ? 'disabled' : ''} btn`} style={{ margin: '20px'}}>
            <button onClick={onClick} disabled={status !== 'Ready'}>
                {displayText()}
            </button>
        </div>
    );
};
