import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Button, DropDown, Input, Loader } from './components';
import './App.scss';

const tesselIP = `${process.env.REACT_APP_TESSEL_IP}:${process.env.REACT_APP_SOCKET_PORT}`;

const logoArray = [
	'https://i.imgur.com/cmGfOjg.jpg?1',
	'https://i.imgur.com/5BC4GGM.jpg?1',
	'https://i.imgur.com/CQ6fA1l.jpg?1',
	'https://i.imgur.com/0bcs0ec.jpg?1'
]

const logoIndex = Math.floor(Math.random() * Math.floor(logoArray.length));

const App = () => {

	const [status, setStatus] = useState('Ready');
	// const [foodLevel, setFoodLevel] = useState('Low');
	const [portionSize, setPortionSize] = useState('normal');
	const [loading, setLoading] = useState(false);
	const [enableFeed, setEnableFeed] = useState(false);
	const socket = socketIOClient(tesselIP);

	useEffect(() => {
		socket.on('status', data => {
			console.log('status- ',data)
			setStatus(data);
		});
		// socket.on("foodLevel", data => {
		// 	setFoodLevel(data);
		// });

		console.log('tesselIP - ', tesselIP);
	}, []);

	const sendFeed = () => {
		console.log('sending feed...')
		socket.emit('feed', portionSize)
	}

	const selectPortion = (e) => {
		console.log(e.target.value);
		setPortionSize(e.target.value);
	}

	const checkAuth = (e) => {
		const input = e.target.value;
		console.log(input);
		console.log(process.env.REACT_APP_PASSCODE)
		if (input === process.env.REACT_APP_PASSCODE) {
			setLoading(true)
			setEnableFeed(true);
		}
	}

	const displayText = () => {
		if (status === 'Ready') {
			return 'Feed'
		} else if (status === 'Complete') {
			return 'Done!'
		} else {
			return <Loader />
		}
	};

	const enableControls = () => {
		setTimeout(() => {
			setLoading(false)
		}, 1500)

		if (loading) {
			return <Loader />
		} else {
			return (
				<div className="feed-enabled">
					<Button
						className="btn-feed"
						onClick={() => sendFeed()}
						text={displayText()}
					/>

					<div className="additional-info">
						<div className="status">
							<p>Status: <span>{status}</span></p>
							{/* <p>Food Level: <span className={foodLevel === 'Low' && 'low'}>
								{foodLevel}
							</span></p> */}
						</div>

						<DropDown
							className="select-feed"
							onChange={(e) => selectPortion(e)}
							defaultValue={portionSize}
							label="Select Portion Size: "
						/>
					</div>
				</div>
			)
		}
		
	};

	return (
		<div className="fat-cat">
			<div className="title">
				<h1>Fat Cat</h1>
				<img src={logoArray[logoIndex]} alt="fat cat logo" />
			</div>
			{
				!enableFeed && (
					<Input
						className="input-auth"
						onChange={(e) => checkAuth(e)}
						label='Enter Passcode'
					/>
				)
			}
			
			{enableFeed && enableControls()}

			<footer>Created by Allen Welch &copy; 2020</footer>
		</div>
	);
}

export default App;
