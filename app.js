var electron = require('electron') // http://electron.atom.io/docs/api
var path = require('path')         // https://nodejs.org/api/path.html
var url = require('url')           // https://nodejs.org/api/url.html
var SerialPort = require('serialport');
var window = null

   var port = new SerialPort('COM3');

   port.write('main screen turn on', function(err) {
     if (err) {
       return console.log('Error on write: ', err.message);
     }
     console.log('message written');
   });



   const Readline = SerialPort.parsers.Readline;
   const parser = new Readline();
   port.pipe(parser);
   parser.on('data', onData);
   port.write('ROBOT PLEASE RESPOND\n');

    port.on('open', onPortOpen);
    //port.on('data', onData);
    port.on('close', onClose);
    port.on('error', onError);


    function onPortOpen(){
        console.log("YESSIR THE PORT IS OPEN COS CAPS");
    }

    var strBuff = "";


    var ipcMain = require('electron').ipcMain;

    ipcMain.on("arduinoCommand",function(e,msg){
      console.log("arduinoCommand : "+msg);
    })

    function onData(d)
    {
      //  console.log("data "+d+"::"+d.length)

        for(var i = 0;i<d.length;i++){
          //console.log("typeof(d) :: "+typeof(d));
					if(d.charCodeAt(i) == 13){
						strBuff.substring(0,strBuff.length-1);

            window.webContents.send('arduinoData', strBuff);

          //  console.log("strBuff :::::::::::: "+strBuff);
						strBuff = "";

					}else{
						strBuff+=d.charAt(i);
					//	console.log("strBuff : "+strBuff);


					}


			}
    }

    function onClose(){
        console.log("Port is closed, yo");
    }
    function onError(err){
        console.log("something went horribly wrong : "+err.message);
    }

// Wait until the app is ready
electron.app.once('ready', function () {
  // Create a new window
  window = new electron.BrowserWindow({
    // Set the initial width to 500px
    width: 1080,
    // Set the initial height to 400px
    height: 1920,
    // Show the minimize/maximize buttons inset in the window on macOS
    titleBarStyle: 'hidden-inset',
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#111",
    // Don't show the window until it ready, this prevents any white flickering
    show: false
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', function () {
    window.show();


  //  console.log("tcsConf : "+conf);


  })
})
