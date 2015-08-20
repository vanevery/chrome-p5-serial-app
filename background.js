chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('serial.html', {
    bounds: {
      width: 700,
      height: 600
    }
  });
});