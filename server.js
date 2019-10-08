var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var socketIO = require('socket.io');
var io = require('socket.io')(http);

// Expressで静的ファイルを利用するためにexpress.staticミドルウェア関数を使う
app.use(express.static(__dirname + '/img'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
	socket.on("key", function(dataFromClient){
		switch(dataFromClient.button){
			case "up":
				socket.broadcast.emit("move", { dir: "up"});
				break;
			case "down":
				socket.broadcast.emit("move", { dir: "down"});
				break;
			case "right":
				socket.broadcast.emit("move", { dir: "right"});
				break;
			case "left":
				socket.broadcast.emit("move", { dir: "left"});
				break;
			default:
				break;
		}
	});
});


http.listen(process.env.PORT || 5000, function(){
	console.log('Server running.');
});
