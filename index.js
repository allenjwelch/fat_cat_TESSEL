const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const five = require("johnny-five");

let Tessel = null;
let board;
let interval;

try {
	Tessel = require('tessel-io');
	board = new five.Board({
		io: new Tessel()
	});
} catch (e) {
	console.log('Tessel board not initialized');
}

require('dotenv').config();

// const PORT = process.env.PORT || 4001;
const PORT = process.env.PORT || 8080;
// const routes = require("./routes/index");

const app = express();
// app.use(routes);
// app.use('/', express.static(__dirname + '/client/build/index.html'));
app.use('/', express.static(__dirname + '/client/build'));

const server = http.createServer(app);
const socketIO = socketIo(server);

if (board) {
	board.on("ready", (e) => {
		const leds = new five.Leds(['a6', 'a5', 'a4']);
		const feedLed = new five.Led('a4');

		// const getFoodLevelAndEmit = socket => {
		// 	let foodLevel = 10;
		// 	let foodStreturn sleep(2000).then(v => {
		// 		console.log('led - off');
		// 		led.off()
		// 	})statusMsg = 'Good';
		// 	if (foodLevel > 5) {
		// 		foodStatusMsg = 'Low'
		// 	}
		// 	// Emitting a new message. Will be consumed by the client
		// 	socket.emit("foodLevel", foodStatusMsg);
		// };

		socketIO.on("connection", (socket) => {
			console.log("New client connected");
			socket.emit("status", 'Ready');

			// if (interval) {
			// 	clearInterval(interval);
			// }
			// interval = setInterval(() => getFoodLevelAndEmit(socket), 1000);
			socket.on("disconnect", () => {
				console.log("Client disconnected");
				// clearInterval(interval);
			});

			socket.on('feed', (msg) => {
				console.log('feed that bitch')
				console.log('portion size: ', msg)
				socket.emit('status', 'Feeding...');


				let timer;

				if (msg === 'extra') {
					timer = 5000;
				} else if (msg === 'snack') {
					timer = 1000;
				} else {
					timer = 3000;
				}

				console.log('timer - ', timer);

				feedLed.on();

				// setTimeout(() => {
				// 	socket.emit("status", 'Ready');
				// }, timer)

			})
		});

		const runLeds = () => {
			for (let index = 0; index < leds.length; index++) {
				const led = leds[index]
				// if (index === leds.length - 1) {
				// 	console.log('led - blink');
				// 	led.blink();
				// } else {
				// 	console.log('led - on');
				// 	led.on();
				// }

				led.on()

				// board.wait(2000, () => {
				// 	led.off();
				// })
				
			}
		}

		// runLeds();

		// const sleep = ms => {
		// 	return new Promise(resolve => setTimeout(resolve, ms))
		// }

		// const runLed = (led, index) => {
		// 	if (index === leds.length - 1) {
		// 		console.log('led - blink');
		// 		led.blink();
		// 	} else {
		// 		console.log('led - on');
		// 		led.on();
		// 	}
		// 	return sleep(2000).then(v => {
		// 		console.log('led - off');
		// 		led.off()
		// 	})
		// }

		// const forLoop = async _ => {
		// 	console.log('Start')

		// 	for (let index = 0; index < leds.length; index++) {
		// 		const led = leds[index]
		// 		await runLed(led, index);
		// 	}

		// 	await runServo();

		// 	console.log('End')
		// }

		// const runServo = async () => {
		// 	console.log('servo - ON')
		// 	return sleep(2000).then(v => console.log('servo - OFF'))
		// }

		// forLoop();

	});

	server.listen(PORT, () => console.log(`Listening on 192.168.0.21:${PORT}`));

} else {
	server.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`));
}

