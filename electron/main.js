const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const menubar = require('menubar')

const mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
