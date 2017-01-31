/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 

/**
*/
"use strict";
var http = require('http');
var fs =  require('fs');
var port = 3001;


var server = http.createServer(function(req, res){
	
function serveImage(filename,req,res){
														// readfile will store in ram - cashe so it is easy to accesss
	var body = fs.readFile('images/' +filename, function(err,body){ // delete the sync part to async it
	if(err){
			console.error(err);
			res.statusCode  = 500;
			res.statusMessage = "whoops";
			res.end("silly me");
			return;
		}
		
		res.setHeader("Content-Type","images\jpeg");
		res.end(body);
	});
	
}	
	
switch(req.url){
		
	case "/chess":
		serveImage('chess.jpg',req,res);
		break;
	case"/fern":	
	case"/fern/":
	case"/fern.jpg/":
	case"/fern.jpeg/":
		serveImage('fern.jpg',req,res);
	default:
		res.statusCode = 404;
		res.statusMessage = "Not found";
		res.end();
	}
	
});

server.listen(port,function(){
 console.log("Listening on port" + port)
});

//localhost:3000  ' port number