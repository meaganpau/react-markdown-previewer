'use strict';

const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      app = express(),
      redis = require('redis'),
      client = redis.createClient(),
      socketio = require('socket.io'),
      port = process.env.PORT || 3000,
      publicPath = path.resolve(__dirname);

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// We point to our static assets
app.use(express.static(publicPath));



//routes for laterrrrrr
// app.get('/:id', (req,res) => {

// });

// app.post('/download', (req, res) => {

// });

// And run the server
let server = app.listen(port, () => {
  console.log('listening on port: '+ port)
});

let io = socketio(server);

io.on('connection', (socket) => {
  socket.on('text', (value) => {
    client.set('markdownFile', value, redis.print);
    
  });
});
