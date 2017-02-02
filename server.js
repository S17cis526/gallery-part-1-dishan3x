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

var stylesheet = fs.readFileSync('gallery.css');

var imageNames = ['/ace','/bubble','/chess','/fern','/mobile'];


	
function serveImage(filename,req,res){
														// readfile will store in ram - cashe so it is easy to accesss
	fs.readFile('images/' +filename, function(err,body){ // delete the sync part to async it
	if(err){
			console.error(err);
			res.statusCode  = 500;
			res.statusMessage = "whoops";
			res.end("silly me");
			return;
		}
		
		res.setHeader("Content-Type","image/jpeg");
		res.end(body);
	});
	
}	
var server = http.createServer(function(req, res){
	
switch(req.url){
	case "/gallery":
		var html = '<!doctype html>';
		//res.end("Hello.Time is "+ Date.now());
		var ghtml = imageNames.map(function(fileName){
			return ' <img src="' + fileName + '">';
		}).join();	
		
		html += '<head><title>Dishan Gallery</title>';
		//html += 'Hello.Time is '+ Date.now();
		html += '<link href="gallery.css" rel="stylesheet" type="text/css" >';
		html += '</head>'; 
		html += '<body>';
		html += '<h1>Gallery</h1>';
		//html += '<img src="images/ace.jpg" alt="a fishing ace at work" >';
		html += ghtml;
		html += '</body>';
		res.setHeader('content-Type','text/html');
		res.end(html);
		break;
	case"/gallery.css":
		res.setHeader('Content-Tyep','text/css');
		res.end(stylesheet);
		break;		
	case "/chess":
		serveImage('chess.jpg',req,res);
		break;
	case"/fern":	
	case"/fern/":
	case"/fern.jpg/":
	case"/fern.jpeg/":
		serveImage('fern.jpg',req,res);
		break;
	case"/ace":
		serveImage('ace.jpg',req,res);
		break;
	case"/mobile":
		serveImage('mobile.jpg',req,res);
		break;
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