const express = require('express');
const http = require("http");
const os = require("os");
const socketIo = require("socket.io");
const five = require("johnny-five");
const fs = require('fs')
const path = require('path');
const moment = require('moment-timezone');
const appRoot = path.resolve(__dirname);

const PORT = process.env.PORT || 8080;
const PROFILE = process.env.PROFILE || 'production'

let filePath = `${appRoot}/auto-feed.txt`;

require('dotenv').config();

console.log('appRoot - ', appRoot);

const app = express();
// const routes = require("./routes/index");
// app.use(routes); // for testing

if (PROFILE === 'local') {
	console.log('starting server locally...');
	filePath = '/auto-feed.txt';
} else {
	app.use('/', express.static(__dirname + '/client/build')); // COMMENT WHEN RUNNING LOCALLY
}

const server = http.createServer(app);
const socketIO = socketIo(server);

let Tessel = null;
let board;

let scheduledList = [];

try {
	Tessel = require('tessel-io');
	board = new five.Board({
		io: new Tessel()
	});
} catch (e) {
	console.log('Tessel board not initialized');
}

const readFile = (socket) => {
	try {
		const data = fs.readFileSync(filePath, 'utf8');

		scheduledList = data.split(',');
		console.log('sever scheduledList - ', scheduledList);
		console.log(`file read from ${filePath} - ${data}`);
		socket.emit("status", "Ready");
		return data;
	} catch (err) {
		console.error(err);
		socket.emit("status", "Ready");
		return '';
	}
};

const writeFile = (data, socket) => {
	try {
		fs.writeFileSync(filePath, data)
		console.log(`file written successfully to ${filePath}`)
		socket.emit('readFile', readFile(socket));
	} catch (err) {
		console.error(err)
	}
};

if (board) {
	board.on("ready", (e) => {
		setInterval(() => {
			const date = new Date();
			const time = moment().tz("America/New_York").format("HH:mm");
			autoFeed(time);
		}, 60000);

		const leds = new five.Leds(['b6', 'b5', 'b4']);
		const button = new five.Button('a2');
		const servo = new five.Servo({
			pin: 'a6',
			type: 'continuous'
		});

		leds.off();

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
			socket.emit("readFile", readFile(socket));

			socket.on("writeFile", (data) => {
				socket.emit("status", "Adding Schedule...");
				writeFile(data, socket);
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
			});

			socket.on("disconnect", () => {
				console.log("Client disconnected");
			});
		});

		const sleep = ms => {
			return new Promise(resolve => setTimeout(resolve, ms))
		};

		const runLed = (led) => {
			console.log('led - on');
			led.on();
			return sleep(1000).then(v => {
				console.log('led - off');
				led.off()
			})
		};

		const autoFeed = (currentTime) => {
			if (scheduledList.length > 0) {
				scheduledList.forEach((schedule) => {	
					if (schedule === currentTime) {
						feedLoop(1000);
					}
				})
			}
		};

		const feedLoop = async (timer, socket) => {
			console.log('Start feedLoop...')

			for (let index = 0; index < leds.length; index++) {
				const led = leds[index]
				await runLed(led);
			}

			await runServo(timer);

			console.log('feeding complete!')
			if (socket) {
				socket.emit('status', 'Ready');
			}
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

	server.listen(PORT, () => console.log(`Listening on http://${os.networkInterfaces().wlan0[0].address}:${PORT}`));

} else {
	socketIO.on("connection", (socket) => {
		console.log("New client connected on local server");
		socket.emit("status", 'Ready');
		socket.emit("readFile", readFile(socket));

		socket.on("writeFile", (data) => {
			socket.emit("status", "Adding Schedule...");
			writeFile(data, socket);
		});

		socket.on('feed', (msg) => {
			console.log('portion size: ', msg)
			socket.emit('status', 'Feeding...');
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});
	});

	server.listen(PORT, () => {
		console.log(`Listening on http://${os.hostname()}.local:${PORT}`);
		console.log(`Listening on http://${os.networkInterfaces().wlan0[0].address}:${PORT}`);
	});
}

