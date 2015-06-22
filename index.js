module.exports = (function() {
    
    var express = require('express');
    var path = require('path');
    var app = express();

    app.use('/assets', express.static('assets'));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'index.html')); 
    });

    // -- register 404 handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found from root');
        err.status = 404;
        next(err);
    });

    // -- register 500 handler (dev)
    app.use(function(err, req, res, next) {
        if (process.env.ENVIRONMENT == 'production') {
            res.status(500).send('An error has occured.');
        } else {    
            res.status(err.status).send('An error has occured:', 
            {
                message: err.message,
                error: err 
            });
        }    
    });
    
    // console.log("### Routing from chathops.io (parent)");
    // console.log(app._router.stack);
    
    return app;
    
})();