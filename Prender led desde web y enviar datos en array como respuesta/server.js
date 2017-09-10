 
 var express = require('express');
 var app = express();
 var server = require('http').Server(app);
 var io = require('socket.io').listen(server);

// const SerialPort = require('serialport');
// const ByteLength = SerialPort.parsers.ByteLength
// // var port = new SerialPort('COM2');
// var port = new SerialPort('COM1', function (err) {
//   if (err) {
//     return console.log('Errorcito papi: ', err.message);
//   }
// });

// const parser = port.pipe(new ByteLength({length: 10}));

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM1');
const parser = new Readline();
port.pipe(parser);
// parser.on('data', console.log);
// port.write('ROBOT PLEASE RESPOND\n');
var info = [];


parser.on('data', function(conta){
	var dato = conta.toString();

	info.unshift(dato);
	console.log(info);

	io.sockets.emit('lectura', info);
	info.splice(2,2);

});


 
app.get('/',function(req,res){
	// res.status(200).send("hola mundo");
	res.sendfile(__dirname+'/index.html');
});

 server.listen(8000, function(){
 	console.log("arranco el server");
 });


port.open(function(){
console.log("Puerto abierto");
});



io.on('connection',function(socket){
console.log("Alguien se conecto");

socket.emit('messages',{
	id: "identificador",
	text: "nombre text"
});

	socket.on('grados', function(grados){
	 console.log(grados);
	 port.write(grados);
	 
	});


});


