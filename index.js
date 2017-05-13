var express = require('express'),
    path = require('path'),
    app = require('express')();
    http = require('http').Server(app),
    httpPort = 8080;

httpServerFunction();
//send file request
   function httpServerFunction(){
        app.use('/', express.static((path.join(__dirname,'../dist'))));
        app.use('/contact', express.static((path.join(__dirname,'../dist'))));
        app.use('/tech', express.static((path.join(__dirname,'../dist'))));
        app.use('/work', express.static((path.join(__dirname,'../dist'))));

        ///////
        app.set('port', (process.env.PORT || 5000));

		app.use(express.static(__dirname + '/public'));

		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');

		app.listen(app.get('port'), function() {
		  console.log('Node app is running on port', app.get('port'));
		});
        //////
    };
