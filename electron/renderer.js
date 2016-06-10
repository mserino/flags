const usb = require('electron-usb')
const annyang = require('annyang')

var isDisabled = true

try {
	var teensy = usb.findByIds(5824,1155);
	teensy.open();
	teensy.interfaces[1].claim()
	var outEndpoint = teensy.interfaces[1].endpoint(3)
} catch(err) {
	alert('Oops. Something went wrong. Please try reconnecting the device and restarting the application. Idiot.')
}

Notification.requestPermission();

function updateIndicator(indicator) {
	document.getElementById('currentSection').innerText = 'Status updated to:' + indicator
}

function sendToggleRequest() {
	isDisabled ? outEndpoint.transfer('1') : outEndpoint.transfer('0')
	isDisabled = !isDisabled
	updateIndicator(isDisabled ? 'stopped' : 'started')
}

function sendStartRequest(noNotification) {
  outEndpoint.transfer('1')
  isDisabled = false
  if (!noNotification) {
    var notify = new Notification('Status updated', { body: 'Your status has been updated to: started', icon: 'assets/icon.png' });
  }
  updateIndicator('started')
}

function sendStopRequest(noNotification) {
  outEndpoint.transfer('0')
  isDisabled = true
  if (!noNotification) {
    var notify = new Notification('Status updated', { body: 'Your status has been updated to: stopped', icon: 'assets/icon.png' });
  }
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

document.getElementById('flagButtonOne').addEventListener('click', function() { sendStartRequest(true) })
document.getElementById('flagButtonTwo').addEventListener('click', function() { sendStopRequest(true) })
