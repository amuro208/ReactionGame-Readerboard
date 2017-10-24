const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron') // http://electron.atom.io/docs/api
var path = require('path')         // https://nodejs.org/api/path.html
var url = require('url')           // https://nodejs.org/api/url.html

var window = null


/*
var SerialPort = require('serialport');
   var port = new SerialPort('COM3', {baudRate: 9600,  'disconnectedCallback': function () {
     console.log("DEVICE: Disconnected.");
     }}, false);


    const Readline = SerialPort.parsers.Readline;
    const parser = new Readline();
    port.pipe(parser);
    parser.on('data', onData);
    port.write('ARDUINO PLEASE RESPOND\n');
    port.on('open', onPortOpen);
    port.on('close', onClose);
    port.on('error', onError);




    //var ipcMain = require('electron').ipcMain;
    ipcMain.on("arduinoCommand",function(event,data){
      //port.write(data+"\n");
      port.write(data+'\n', function(error, results) {
            if(error){
                console.log(error);
                //Handle Error
            }
            if(results){
                console.log(results);
                //Handle Error
            }

                console.log("Write : " + data);
                // uncomment below line to close the port internally after writing.
                //port.close();


        });
    })
    function onPortOpen(){
        console.log("YESSIR THE PORT IS OPEN COS CAPS");
    }

    var strBuff = "";
    function onData(d)
    {
      for(var i = 0;i<d.length;i++){
        //console.log("typeof(d) :: "+typeof(d));
				if(d.charCodeAt(i) == 13){
					strBuff.substring(0,strBuff.length-1);
          window.webContents.send('arduinoData', strBuff);
					strBuff = "";
				}else{
					strBuff+=d.charAt(i);
				}
			}
    }

    function onClose(){
        console.log("Port is closed, yo");
    }
    function onError(err){
        console.log("Something went horribly wrong : "+err.message);
    }

*/





// Wait until the app is ready
app.on('ready', function () {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 500px
    width: 1080,
    // Set the initial height to 400px
    height: 3840,

    alwaysOnTop :true,
    frame:false,
    // Show the minimize/maximize buttons inset in the window on macOS
    titleBarStyle: 'hiddenInset',


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
   // window.setFullScreen(true);
    window.setSize(1080,3840);
	  window.setPosition(0,0);
	  //window.toggleDevTools();
  })
/*
  globalShortcut.register('CommandOrControl+F', () => {
  //  console.log("window.getFullScreen()) : "+window.getFullScreen());
    if(window.isFullScreen()){
      window.setFullScreen(false);
      window.setSize(1080,3840);

      //window.setMenu();

    }else{
      window.setFullScreen(true);
      window.setSize(1080,3840);
      //window.setMenu(null);
    }
  })
*/


})

app.on('window-all-closed', function(){
	if(process.plaform!='darwin'){
	app.quit();
	}
});
