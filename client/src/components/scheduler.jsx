import React, { useState } from 'react';

import './styles/scheduler.scss';

const CN = 'scheduler';

export const Scheduler = ({ scheduledList, setScheduledList }) => {
    const [openScheduler, setOpenScheduler] = useState(false);
    const [activeSchedule, setActiveSchedule] = useState(null);

    const addSchedule = () => {
        setOpenScheduler(true);
    };

    const deleteSchedule = (schedule) => {
        const tempList = scheduledList;
        const index = tempList.indexOf(schedule);
        tempList.splice(index, 1);
        setScheduledList([...tempList]);
    };

    const onChangeTime = (e) => {
        const { value } = e.target;
        setActiveSchedule(value);
    };

    const sumitSchedule = () => {
        if (activeSchedule && activeSchedule !== '' && !scheduledList.includes(activeSchedule)) {
            const tempList = scheduledList;
            tempList.push(activeSchedule);
            setScheduledList([...tempList]);
            cancelSchedule();
        }
    };

    const cancelSchedule = () => {
        setActiveSchedule(null);
        setOpenScheduler(false);
    };

    const renderTimeSelect = () => (
        <div className="time-container">
            <input type="time" id="feed-time" onChange={(e) => onChangeTime(e)} />
            <div id="btn-submit" onClick={sumitSchedule} />
            <div id="btn-cancel" onClick={cancelSchedule} />
        </div>
    );

    const renderAddBtn = () => (
        <button
            className="btn-schedule"
            onClick={() => addSchedule()}
        >
            Add
        </button>
    );

    const renderTimeDisplay = (schedule) => {
        let displayTime;

        try {
            const hoursMin =schedule.split(':');
            const hours = parseInt(hoursMin[0]);
            if (hours > 12) {
                const formattedHours = hours - 12;
                displayTime = `${formattedHours}:${hoursMin[1]} PM`;
            } else {
                displayTime = `${schedule} AM`;
            }
        } catch (err) {
            displayTime = schedule;
        }

        return (
            <div className="time-container">
                <p className="display-time">{displayTime}</p>
                <div id="btn-cancel" onClick={() => deleteSchedule(schedule)} />
            </div>
        );
    };

    return (
        <div className={CN}>
            <h4 >Scheduler</h4>
            { scheduledList.map(schedule => renderTimeDisplay(schedule)) }
            { openScheduler ? renderTimeSelect() : renderAddBtn() }
        </div>
    )
};
