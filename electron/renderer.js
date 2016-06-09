const usb = require('electron-usb')

var count = true

var teensy = usb.findByIds(5824,1155);
  	teensy.open();
   teensy.interfaces[1].claim()
  	var outEndpoint = teensy.interfaces[1].endpoint(3)

document.getElementById('flagbutton').addEventListener('click', function() {
    //alert('hello!');
    
  //	console.log(teensy.interfaces[1].endpoint(3))

  	 count ? outEndpoint.transfer('1') : outEndpoint.transfer('0')
	 count = !count

});
