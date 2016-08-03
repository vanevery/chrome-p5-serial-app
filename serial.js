console.log("App Running");

var connectionId = null;
var onReadCallback = null;

var listPorts = function() {
	chrome.serial.getDevices(onGotDevices);
};

var onGotDevices = function(ports) {
  for (var i=0; i<ports.length; i++) {
    console.log(ports[i].path);
  }	
};

var connect = function(path) {
	var options = {bitrate: 9600};
	chrome.serial.connect(path, options, onConnect)
};

var onConnect = function(connectionInfo) {
	console.log(connectionInfo);
	connectionId = connectionInfo.connectionId;
};

var disconnect = function() {
	chrome.serial.disconnect(connectionId, onDisconnect);
};

var onDisconnect = function(result) {
  if (result) {
    console.log("Disconnected from the serial port");
  } else {
    console.log("Disconnect failed");
  }
};

var setOnReadCallback = function(callback) {
	onReadCallback = callback;
	chrome.serial.onReceive.addListener(onReceiveCallback);
};

var onReceiveCallback = function(info) {
    if (info.connectionId == connectionId && info.data) {
      var str = convertArrayBufferToString(info.data);
      if (onReadCallback != null) {
      	onReadCallback(str);
      }
    }
 };


 var writeSerial=function(str) {
  chrome.serial.send(connectionId, convertStringToArrayBuffer(str), onSend);
}
// Convert string to ArrayBuffer
var convertStringToArrayBuffer=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

