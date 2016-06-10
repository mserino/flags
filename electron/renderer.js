const usb = require('electron-usb')
const annyang = require('annyang')

var isDisabled = true

try {
  // Claim our endpoint on the USB
	var teensy = usb.findByIds(5824,1155);
	teensy.open();
	teensy.interfaces[1].claim()
	var outEndpoint = teensy.interfaces[1].endpoint(3)
} catch(err) {
	alert('Oops. Something went wrong. Please try reconnecting the device and restarting the application. Idiot.')
}

Notification.requestPermission();

function updateIndicator(indicator) {
  // Update the view with the current status
	document.getElementById('currentSection').innerText = 'Status: ' + indicator
}

function sendRequest(started) {
  outEndpoint.transfer(started ? '1' : '0')
  isDisabled = !started
  updateIndicator(started ? 'started' : 'stopped')
}

function sendToggleRequest() {
  sendRequest(isDisabled)
}

function sendStartRequest(noNotification) {
  sendRequest(true)
  if (!noNotification) {
    var notify = new Notification('Status updated', {
      body: 'Your status has been updated to: started',
      icon: 'assets/icon.png'
    })
  }
}

function sendStopRequest(noNotification) {
  sendRequest(false)
  if (!noNotification) {
    var notify = new Notification('Status updated', {
      body: 'Your status has been updated to: stopped',
      icon: 'assets/icon.png'
    })
  }
}

// Turn on debug messages
annyang.debug()

// Define commands
var commands = {
	'flags start': sendStartRequest,
	'flags stop': sendStopRequest,
	'flags change': sendStartRequest
}

// Add our commands to annyang
annyang.addCommands(commands)

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start()

// Add listeners to our two buttons
document.getElementById('flagButtonOne').addEventListener('click', function() {
  sendStartRequest(true)
})

document.getElementById('flagButtonTwo').addEventListener('click', function() {
  sendStopRequest(true)
})
