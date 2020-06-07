# Fat Cat (Tessel)
Fat 
![Fat Cat](https://i.imgur.com/hHxNI6l.png?1)

## Prerequisites / Dependencies
To duplicate you will need the following things properly installed on your computer.
* [Git](http://git-scm.com/)
* [Express.js](https://expressjs.com/)
* [Node.js](http://nodejs.org/)
* [Johnny-Five](http://johnny-five.io/api/)
* [Socket-io](https://socket.io/?ref=cybrhome)
* [t2-cli](https://tessel.gitbooks.io/t2-docs/content/API/CLI.html)


## Installation
* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Parts and Materials
| Link | Image |
| ---- | :----: |
[Tessel 2](https://www.sparkfun.com/products/13841) | ![Tessel 2](https://i.imgur.com/EFFAlj4t.jpg?2)
[Parallax Continuous Rotation Servo](https://www.sparkfun.com/products/16048) | ![Servo](https://i.imgur.com/Eplrtjpt.jpg?2)
[Dry Food Dispenser](https://www.amazon.com/gp/product/B009Q8PZMK/ref=ppx_yo_dt_b_asin_title_o03_s01?ie=UTF8&psc=1) | ![Dispenser](https://i.imgur.com/Tdu27sQt.jpg?1)
[Solder-able Breadboard](https://www.amazon.com/gp/product/B071R3BFNL/ref=ppx_yo_dt_b_asin_title_o03_s01?ie=UTF8&psc=1) | ![Solder-able Breadboard](https://i.imgur.com/Vipb9nxs.jpg?2)
Soldering Iron | ![Soldering Iron](https://i.imgur.com/e4BuTGIt.jpg?1)
[Jumper Wires](https://www.sparkfun.com/products/12795) | 
[Resistor 10K Ohm](https://www.sparkfun.com/products/11508) | 
[Resistor 100 Ohm](https://www.sparkfun.com/products/14493) | 
[LEDs](https://www.sparkfun.com/products/12062) |
[Button](https://www.sparkfun.com/products/14460) | 

## Setup
1. Globally install t2-cli: `npm install -g t2-cli`  
2. Connect Tessel 2 via usb and follow t2 docs to provision and setup wifi: (t2-cli)[https://tessel.gitbooks.io/t2-docs/content/API/CLI.html]  
3. Create a `.env` file within `client` directory and add the following:  
```
REACT_APP_TESSEL_IP = <tessel ip address>
REACT_APP_SOCKET_PORT = <socket port>
REACT_APP_PASSCODE = <secret passcode>
```  
4. Build UI: `npm run build`  
5. Deploy code to Tessel: `npm run deploy`
  
## Final Product 
![FatCat1](https://i.imgur.com/PrWdYnD.jpg?1)
![FatCat2](https://i.imgur.com/TFwMps6.jpg?1)
![FatCat3](https://i.imgur.com/Yl06odx.jpg?2)  
![FatCat - Gif](https://i.imgur.com/ElUjSYGt.gif)