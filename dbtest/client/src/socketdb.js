//import React from 'react';

const DB = require('./dbmaker');
let socket = require('socket.io-client')('http://localhost:5000');


DB("GET", "SELECT * FROM filelist").then(function(res) {
    console.log(res);
    socket.emit('dbrow', res.row);
}).catch(err => {
    console.log(err);
});
