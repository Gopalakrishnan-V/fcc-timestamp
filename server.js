// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:dateString?", function(req, res){
  let {dateString} = req.params;
  if(dateString!==undefined && Number(dateString)){
    dateString = Number(dateString);
  }

  let date = null;
  if(dateString === undefined){
    date = new Date();
  }
  else{
    date = new Date(dateString);
  }
  if(!date.valueOf()){
    return res.send({error: "Invalid Date"});
  }

  
  res.send({
    unix: date.valueOf(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});