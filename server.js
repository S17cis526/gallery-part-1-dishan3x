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

function getImageNames(callback){
	fs.readdir('images',function(err,fileNames){ // synchro function
		if(err)callback(err,undefined);
			else callback(false,fileNames);
	});
	
}

function imageNamesToTags(fileNames){
	return fileNames.map(function(fileName){
			return ' <img src="'+fileName+'" alt="'+fileName+'">';
	});
	
}
	
function buildGallery(imageTags){
	var html = '<!doctype html>';
		html += '<head><title>Dishan Gallery</title>';
		//html += 'Hello.Time is '+ Date.now();
		html += '<link href="gallery.css" rel="stylesheet" type="text/css" >';
		html += '</head>'; 
		html += '<body>';
		html += '<h1>Gallery</h1>';
		html += imageNamesToTags(imageTags).join(''); 
		//html += ghtml;
		html += '</body>';
	return html;	
}

function serveGallery(req,res){
		getImageNames(function(err,imageNames){
			if(err){
				console.error(err);
				res.statusCode = 500;
				res.statusMessage = 'server error';
				res.end();
				return;
			}
			res.setHeader("Content-Type","text/html");
			res.end(buildGallery(imageNames));
		});
	
}
function serveImage(filename,req,res){
														// readfile will store in ram - cashe so it is easy to accesss
	fs.readFile('images' +filename, function(err,body){ // delete the sync part to async it
	if(err){
			console.error(err);
			res.statusCode  = 404;
			res.statusMessage = "server error";
			res.end("silly me");
			return;
		}
		
		res.setHeader("Content-Type","image/jpeg");
		res.end(body);
	});
	
}	
var server = http.createServer(function(req, res){
	
switch(req.url){
	case "/":
	case "/gallery":
		serveGallery(req,res);
		
		//res.end("Hello.Time is "+ Date.now());
		//var ghtml = imageNames.map(function(fileName){
		//	return ' <img src="' + fileName + '">';
		//}).join();	
		
	//	res.setHeader('content-Type','text/html');
		//res.end(html);
		break;
	case"/gallery.css":
		res.setHeader('Content-Tyep','text/css');
		res.end(stylesheet);
		break;		
	case "/chess":
		serveImage('chess.jpg',req,res);
		break;
	default:
		serveImage(req.url,req,res);
		break;
	}
	
});

server.listen(port,function(){
 console.log("Listening on port" + port)
});

//localhost:3000  ' port number