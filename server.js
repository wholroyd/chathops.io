var express = require('express');
var app = express();

// Load all of the app(s) in order of furthest child to root
app.use('/api',     require('./chathops-api/index.js'));
app.use('/client',  require('./chathops-client/index.js'));
app.use('/',        require('./index.js'));

// Start the server
var port = process.env.PORT || 7000;
var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)
    console.log('-- using NodeJS verison %s', process.version);
    console.log('-- from the path of %s', __dirname);
    // console.log(app._router.stack);
});