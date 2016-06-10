const usb = require('electron-usb')
const annyang = require('annyang')

var count = true

try {
  const teensy = usb.findByIds(5824,1155)
  teensy.open()
  teensy.interfaces[1].claim()
  const outEndpoint = teensy.interfaces[1].endpoint(3)
} catch(err) {
  alert('Oops. Something went wrong. Please try reconnecting the device and restarting the application. Idiot.')
}

function sendToggleRequest() {
  count ? outEndpoint.transfer('1') : outEndpoint.transfer('0')
	count = !count
}

function sendStartRequest() {
  count = outEndpoint.transfer('1')
}

function sendStopRequest() {
  count = outEndpoint.transfer('0')
}

// Turn on debug messages
annyang.debug()

// Define sample command
var commands = {
  'flags start': sendStartRequest,
  'flags stop': sendStopRequest,
  'flags change': sendToggleRequest
}

// Add our commands to annyang
annyang.addCommands(commands)

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start()

document.getElementById('flagbutton').addEventListener('click', sendToggleRequest)
