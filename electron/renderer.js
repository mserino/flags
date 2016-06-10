const usb = require('electron-usb')
const annyang = require('annyang')
const music = require('playback')

// We're assuming that when you start the app the available flag is pointing up
var states = ['available', 'coffee', 'in the zone', 'music', 'idle', 'do not disturb', 'food', 'in a call']
var state = 'available'

try {
  // Claim our endpoint on the USB
	var teensy = usb.findByIds(5824, 1155)
	teensy.open()
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
  var index = states.indexOf(state)

  if (index+1 === states.length) {
    outEndpoint.transfer(String(1))
    state = states[0]
  } else {
    outEndpoint.transfer(String(1))
    state = states[index+1]
  }

  updateIndicator(state)
}

function sendSpecific(index) {
	var shiftBy = index - states.indexOf(state);
	if(shiftBy<0)
	{
		shiftBy = shiftBy + states.length
	}
  outEndpoint.transfer(String(shiftBy))
  state = states[index]
  updateIndicator(state)
}

function sendToggleRequest() {
  sendRequest(busy)
}

function sendStartRequest(noNotification) {
  sendRequest(true)
  if (!noNotification) {
    var notify = new Notification('Status updated', {
      body: 'Your status has been updated',
      icon: 'assets/icon.png'
    })
  }
}

function sendStopRequest(noNotification) {
  sendRequest(false)
  if (!noNotification) {
    var notify = new Notification('Status updated', {
      body: 'Your status has been updated',
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

// Start listening
annyang.start()

// Listeners for iTunes play and pause events
music.on('playing', function(data) {
  // If we aren't busy when we recieve a playing event then we trigger one to say we are
  // Subsequent play events won't do anything since we're busy
  if (state !== 'music') {
    sendSpecific(states.indexOf('music'))
  }
})

music.on('paused', function(data) {
  // If you then pause we trigger an event to say you are not busy anymore
  // No hiding behind those headphones!
  if (state === 'music') {
    sendSpecific(states.indexOf('available'))
  }
})

// Add listener to our button
document.getElementById('flagButtonOne').addEventListener('click', function() {
  sendStartRequest(true)
})
