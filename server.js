var express = require('express');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('common'))

require('./router/router.js')(app);

var server = app.listen(8080, "127.0.0.1", function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

