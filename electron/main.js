const electron = require('electron')
const usb = require('electron-usb')
const menubar = require('menubar')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const mb = menubar()

mb.on('ready', function ready () {
  console.log('app is ready')
  //console.log(usb.getDeviceList());
  var teensy = usb.findByIds(5824,1155);
  teensy.open();
 // console.log(teensy.interfaces)

 // console.log(teensy.interfaces[0].claim())

 // console.log(teensy.interfaces[0].endpoint(130))


  console.log("-----");
   console.log(teensy.interfaces[1].claim())

  var outEndpoint = teensy.interfaces[1].endpoint(3)
  console.log(teensy.interfaces[1].endpoint(3))
  outEndpoint.transfer('1')
  // your app code here
})


