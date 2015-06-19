var newrelic = required('newrelic');
var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

// Configure local asset requests
router.use(express.static(path.join(__dirname, 'assets')));
router.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'index.html')); 
});

// Configure routing
app.use('/', router);
app.use('/api', require('./api/index.js'));
app.use('/client', require('./client/index.js'));

// Configure some error handlers
// -- register 404 handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// -- register 500 handler (dev)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (process.env.ENVIRONMENT == 'production') {
        res.render('An error has occured.');
    } else {    
        res.render('An error has occured:', {
            message: err.message,
            error: err
        });
    }
});

// Start the server
var port = process.env.PORT || 7000;
var server = app.listen(port , function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s using NodeJS verison %s', host, port, process.version);
    
});