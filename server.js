var http 	= require('http'	),
 	fs 		= require('fs'		),
 	path 	= require('path'	);
 	
var defaultpage = (function(){
	var f = path.join(process.cwd(), "default.html");
	if(fs.existsSync(f)){
		console.log("Default page loading into buffer");
		return fs.readFileSync(f);
	}
	else
	{
		console.log("No default page found");
		return null;
	}
}());


var server = http.createServer(serveRequest);
server.listen(8080, function(){console.log("Webserver started");}); //port 80 requires admin privileges  

function serveRequest(request, response){
	console.log('Request: "'+request.url+'"');
	request.url = request.url.split("?")[0].split("#")[0]; 
	var fileroute = path.join(process.cwd(), request.url);
	if (request.url.length > 1 && fs.existsSync(fileroute))
	{
		switch(path.extname(fileroute))
		{
			case".htm": case".html":	response.writeHead(200, {'Content-Type': 'text/html'}); 		break;
			case".js":					response.writeHead(200, {'Content-Type': 'text/javascript'}); 	break;
			case".jpg": case".jpeg": 	response.writeHead(200, {'Content-Type': 'image/jpeg'});		break;
			case".png": 			 	response.writeHead(200, {'Content-Type': 'image/png'});			break;
			case".css":					response.writeHead(200, {'Content-Type': 'text/css'});			break;
			case".iso":					response.writeHead(200, {'Content-Type': 'image/x-icon'});		break;
			default:					response.writeHead(200, {'Content-Type': 'text/plain'});		break;
		}
		console.log("Serving requested file");
		fs.readFile(fileroute, function(err,data){response.end(data);});
	}
	else
	{
		if(request.url.length <= 1 && defaultpage)
		{
			console.log("Serving default page");
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(defaultpage);
		}
		else
		{
			console.log('Invalid request');
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end('404');
		}
	}
};