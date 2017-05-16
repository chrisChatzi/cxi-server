var express = require('express'),
    path = require('path'),
    app = require('express')();
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    mail = require('nodemailer'),
    httpPort = 8080;

httpServerFunction();
//send file request
   function httpServerFunction(){
        app.use('/', express.static((path.join(__dirname,'./dist'))));
        app.use('/contact', express.static((path.join(__dirname,'./dist'))));
        app.use('/tech', express.static((path.join(__dirname,'./dist'))));
        app.use('/work', express.static((path.join(__dirname,'./dist'))));

        app.use(bodyParser.json({limit: "50mb"}));
        app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

        app.post('/sendMsg', function (req, res) {
            sendMsg(req.body);
            res.send(JSON.stringify({ res : true }));
        });
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

    //send email to trader
    function sendMsg(data){
        var html = "";
        html += "<h3>CXI Message</h3>";
        html += "<p><b>From:</b> "+data.name+"</p>";
        html += "<p><b>Email:</b> "+data.email+"</p>";
        html += "<br/>";
        html += "<p>"+data.txt+"</p>";
        let transporter = mail.createTransport({
            service: 'yahoo',
            auth: {
                user: 'xchris777@yahoo.com',
                pass: 'ca21d3yh7'
            }
        });
        let mailOptions = {
            from: 'Christos<xchris777@yahoo.com>',
            to: 'xchris777@yahoo.com',
            subject: 'CXI message: '+data.title,
            text: data.name+" "+data.txt,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }