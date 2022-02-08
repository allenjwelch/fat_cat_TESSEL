import React, { useState } from 'react';

import './styles/scheduler.scss';

const CN = 'scheduler';

export const Scheduler = ({ scheduledList, setScheduledList }) => {
    const [openScheduler, setOpenScheduler] = useState(false);
    const [activeSchedule, setActiveSchedule] = useState(null);

    const timeOptions = [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30'
    ];

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
            <datalist id="time-options">
                { timeOptions.map((time) => <option value={time} />)}
            </datalist>
            <input type="time" list="time-options" id="feed-time" onChange={(e) => onChangeTime(e)} />
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
