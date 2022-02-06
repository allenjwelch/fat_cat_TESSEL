const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const five = require("johnny-five");

require('dotenv').config();

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

const PORT = process.env.PORT || 8080;
const routes = require("./routes/index");


const app = express();
// app.use(routes); // for testing
app.use('/', express.static(__dirname + '/client/build'));

const server = http.createServer(app);
const socketIO = socketIo(server);

if (board) {
	board.on("ready", (e) => {
		const leds = new five.Leds(['b6', 'b5', 'b4']);
		const button = new five.Button('a2');
		const servo = new five.Servo({
			pin: 'a6', 
			type: 'continuous'
		});

		leds.off();

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

		button.on("press", () => {
			console.log('servo and led(b4) - ON')
			servo.cw(1);
			leds[2].on();
		}); 
		button.on("release", () => {
			console.log('servo and led(b4) - OFF')
			servo.stop();
			leds.off();
		});

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
				console.log('portion size: ', msg)
				socket.emit('status', 'Feeding...');

				let timer;
				if (msg === 'extra') {
					timer = 3000;
				} else {
					timer = 1000;
				}

				console.log('timer - ', timer);

				feedLoop(timer, socket);
			})
		});
		
		const sleep = ms => {
			return new Promise(resolve => setTimeout(resolve, ms))
		}

		const runLed = (led) => {
				console.log('led - on');
				led.on();
			return sleep(1000).then(v => {
				console.log('led - off');
				led.off()
			})
		}

		const feedLoop = async (timer, socket) => {
			console.log('Start feedLoop...')

			for (let index = 0; index < leds.length; index++) {
				const led = leds[index]
				await runLed(led);
			}

			await runServo(timer);

			console.log('feeding complete!')
			socket.emit('status', 'Ready');

			console.log('End feedLoop.')
		}

		const runServo = async (timer) => {
			console.log('servo - ON')
			servo.cw(1);
			leds[2].on();
			return sleep(timer).then(v => {
				console.log('servo - OFF'); 
				servo.stop();
				leds.off();
			})
		}

	});

	server.listen(PORT, () => console.log(`Listening on 192.168.0.21:${PORT}`));

} else {
	server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

