require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

let failover_flag = true;

app.get('/1', function (req, res, next) {
    res.send("<!DOCTYPE html>" +
      "<html>"+
        "<head>" +
          '<meta charset="UTF-8">' +
        "</head>" +
        "<body>" +
        "<h1>Hello World</p>" +
        "</body>" +
      "</html>"
    );
    console.log("Hello World")
});

app.get('/2', function (req, res, next) {
    if (failover_flag) {
        res.json({ error: 'true' })
    }else{
        res.send("Hello World 2");
    }
})

app.get('/3', function (req, res, next) {
    if (failover_flag) {
        res.sendStatus(500);
    }else{
        res.send("Hello World 3");
    }
})

app.get('/4', function (req, res, next) {
    if (failover_flag) {
        setTimeout( function() {
            res.send(200);
        }, 10000);
    }else{
        res.send("Hello World 4");
    }
})



app.use('/nuxt', express.static(__dirname + '/dist'));
app.use('/', express.static(__dirname + '/public'));

app.listen(port);
console.log('Server started!');
