Serial with a Chrome App

One alternative to using accessing Serial through a local server is to create a Chrome App instead.  Chrome Apps are applications that use Chrome as the application environment and are cross-platform. They can be developed using JavaScript, HTML, and CSS just like a normal webpage but they have increased capabilities to access local hardware.  Finally, it might be obvious but Chrome Apps need be run with Chrome; you can't use them with Safari, IE, Firefox, or any other browser.

Building a basic Chrome App

First we need a folder for our app and inside of it a file called "manifest.json".  This file will contain the metadata, permissions, and other declarations requried for our project.

We'll also need an icon for the extension.  This should be a XxX pixel PNG file and will be used to represent the extension in the browser.

Finally we'll need an HTML file for the interface and a JavaScript file: "serial.html" and "serial.js".

Now we can fill in the manifest file with the correct information:

{
  "name": "Serial App",
  "description": "This app is an example serial app that can be used with p5.js",
  "version": "1.0",
  "manifest_version": 2,
  "icons": {
    "16": "serial.png",
    "128": "serial.png"
  },
  "app": {
    "background": {
      "scripts": ["serial.js"]
    }
  },  
  "permissions": [
   "serial"
   ]
}

The "app" portion of this defines the script that will be run when the app is launched.

Let's put this in our serial.js file:

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('serial.html', {
    bounds: {
      width: 700,
      height: 600
    }
  });
});

This tells chrome to create a window 700px by 600px that contains serial.html.

serial.html

<html>
  <head>
    <title>Serial App</title>
  </head>
  <body>
    <h1>Serial App</h1>
    <button id="start">
      Start Serial Communication
    </button>
  </body>
</html>

Loading:

Load "chrome://extensions/" in your browser, check "Developer mode" and click "Load unpacked extension" and choose the directory containing your extension code.

Debugging/Running:

Now, you should see your extension's icon in the browser window to the right of the URL bar.  Clicking on it should show display the rendered serial.html page in a pop-up directly under the icon.

Clicking on the "Start Serial Communication" should kick things off and make serial available to your page.

References:

https://developer.chrome.com/apps/first_app

chrome.serial
https://developer.chrome.com/apps/serial

https://developer.chrome.com/apps/app_serial


