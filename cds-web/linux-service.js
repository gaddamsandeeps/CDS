var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var Service = require('node-linux').Service,
    cdsConfig = require("cds-config");

// Create a new service object
var svc = new Service({
    name: cdsConfig.appname,
    description: cdsConfig.appname+" "+cdsConfig.app.description,
    script: require('path').join(__dirname, 'app.js')
});

//svc.user.domain = 'mydomain.local';
//svc.user.account = 'username';
//svc.user.password = 'password';

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    console.log(cdsConfig.appname + " Tool Service installed.");
    svc.start();
});

svc.on('alreadyinstalled', function() {
    console.log(cdsConfig.appname + " Tool Service already installed.");
});

svc.on('invalidinstallation', function() {
    console.log(cdsConfig.appname + " Tool Service invalid installation.");
});

svc.on('uninstall', function() {
    console.log(cdsConfig.appname + " Tool Service uninstalled.");
});

svc.on('start', function() {
    console.log(cdsConfig.appname + " Tool Service started.");
});

svc.on('stop', function() {
    console.log(cdsConfig.appname + " Tool Service stopped.");
});

svc.on('error ', function() {
    console.log(cdsConfig.appname + " Tool Service has an error.");
});

var args = process.argv.slice(2)[0];
if (args === 'install') {
    svc.install();
} else if (args === 'uninstall') {
    svc.uninstall();
} else if (args === 'start') {
    svc.start();
} else if (args === 'stop') {
    svc.stop();
} else {
    console.log("Please pass action as argument like install/uninstall/start/stop");
}
