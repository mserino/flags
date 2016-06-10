const usb = require('electron-usb')
const annyang = require('annyang')

var isDisabled = true

try {
  var teensy = usb.findByIds(5824,1155)
  teensy.open()
  teensy.interfaces[1].claim()
  var outEndpoint = teensy.interfaces[1].endpoint(3)
} catch(err) {
  alert('Oops. Something went wrong. Please try reconnecting the device and restarting the application. Idiot.')
}

function updateIndicator(indicator) {
  document.getElementById('status').innerText = 'Status updated to:' + indicator
}

function sendToggleRequest() {
  isDisabled ? outEndpoint.transfer('1') : outEndpoint.transfer('0')
	isDisabled = !isDisabled
  updateIndicator(isDisabled ? 'stopped' : 'started')
}

function sendStartRequest() {
  outEndpoint.transfer('1')
  isDisabled = false
  updateIndicator('started')
}

function sendStopRequest() {
  outEndpoint.transfer('0')
  isDisabled = true
  updateIndicator('stopped')
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
