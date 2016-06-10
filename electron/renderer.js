const usb = require('electron-usb')
const annyang = require('annyang')

var count = true

try {
  var teensy = usb.findByIds(5824,1155);
  teensy.open();
  teensy.interfaces[1].claim()
  var outEndpoint = teensy.interfaces[1].endpoint(3)
} catch(err) {
  alert('Oops. Something went wrong. Please try reconnecting the device and restarting the application. Idiot.')
}

function sendRequest() {
  count ? outEndpoint.transfer('1') : outEndpoint.transfer('0')
	count = !count
}

// Turn on debug messages
annyang.debug()

// Define sample command
var commands = {
  'hello': sendRequest
}

// Add our commands to annyang
annyang.addCommands(commands)

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start()

document.getElementById('flagbutton').addEventListener('click', sendRequest)
