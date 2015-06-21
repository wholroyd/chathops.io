var express = require('express');
var app = express();

// Load all of the app(s)
app.use('/',        require('./index.js'));
app.use('/api',     require('./chathops-api/index.js'));
app.use('/client',  require('./chathops-client/index.js'));

// Start the server
var port = process.env.PORT || 7000;
var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s using NodeJS verison %s', host, port, process.version);
    console.log(app._router.stack);
});