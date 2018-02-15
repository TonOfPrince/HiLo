const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// port
const port = process.env.PORT || 3000;

// ip
const ip = "127.0.0.1";

app.use(express.static(__dirname));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  	message: 'Welcome to the beginning of nothingness.',
}));

app.get('/',function(req,res){
  res.sendfile("index.html");
});

// log where we are listening
console.log("Listening on http://" + ip + ":" + port);

app.listen(port, ip);