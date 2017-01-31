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

var imageNames = ['ace.jpg','bubble.jpg','chess.jpg'];

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
	case "/gallery":
		//res.end("Hello.Time is "+ Date.now());
var ghtml = imageNames.map(function(fileName){
	'<img src="images/' +fileName+' alt="a fishing ace at work" >'
});	
	var html = '<!doctype html>';
		html += '<head><title>Dishan Gallery</title></head>';
		//html += 'Hello.Time is '+ Date.now();
		html += '<link href="gallery.css" rel="stylesheet" type="text/css" >';
		html += '<body>';
		html += '<h1>Gallery</h1>';
		//html += '<img src="images/ace.jpg" alt="a fishing ace at work" >';
		html += ghtml;
		html += '</body>';
		res.setHeader('content-Tyep','text/html');
		res.end(html);
		break;
	case "/chess":
		serveImage('chess.jpg',req,res);
		break;
	case"/gallery.css":
		res.setHeader('Content-Tyep','text/css');
		res.end(stylesheet);
	case"/fern":	
	case"/fern/":
	case"/fern.jpg/":
	case"/fern.jpeg/":
		serveImage('fern.jpg',req,res);
		break;
	case"/ace":
		serveImage('ace.jpg',req,res);
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