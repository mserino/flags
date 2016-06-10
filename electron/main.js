const electron = require('electron')
const menubar = require('menubar')

// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const mb = menubar()

mb.on('ready', function ready() {
  console.log('app is ready');
})
