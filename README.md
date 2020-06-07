# Fat Cat (Tessel)
Fat Cat is an IoT cat feeder built using a Tessel 2 hosting a custom user interface. While on the same network, the interface provides an option to select a portion size and activate the food dispenser.  
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
  
## Testing and Assembly
The servo frame was built using an old plastic clipboard and some angle brackets. Using a drill and a utility knife I was able to make the screw and led holes and cut away excess pieces of the dispenser to lay the wires through the inside.   
![clipboard](https://i.imgur.com/aBdjE8mm.jpg)
![angle](https://i.imgur.com/u1Wmjunm.jpg)
![drill](https://i.imgur.com/TONINVJm.jpg)  
   
![lights](https://i.imgur.com/KZZoJLvm.jpg)
![backing1](https://i.imgur.com/iSJR40jm.jpg)
![backing2](https://i.imgur.com/Inqs1Yrm.jpg)  
  
After testing the circuit on a breadboard, I duplicated it on a solder-able breadboard to make it more permanent.
![soldering1](https://i.imgur.com/manmTte.jpg?2)
![soldering2](https://i.imgur.com/dbdMRFo.jpg?2)  
  

## Final Product 
![FatCat1](https://i.imgur.com/PrWdYnD.jpg?1)
![FatCat2](https://i.imgur.com/TFwMps6.jpg?1)
![FatCat3](https://i.imgur.com/Yl06odx.jpg?2)  
![FatCat - Gif](fatCat.gif)
  
### Inspiration  
I am not the first with this idea, nor will I be the last. I'd like to thank all the others that came before me and from whose code I drew inspiration. Check out these other awesome projects!  
* [OneTesselAway](https://github.com/robatron/OneTesselAway)  
* [cat-feeder](https://github.com/Frijol/cat-feeder)  
* [robokitty](https://github.com/rachelnicole/robokitty)  