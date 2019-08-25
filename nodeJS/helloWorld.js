const portID = 8080;
var http = require("http");
var hello = require("./testModule")
var myServer = http.createServer(function (request, response){
    response.writeHead(200, {'content-type':'text/plain'});
    response.end(hello.helloWorld());
})
myServer.listen(portID);
console.log("Server listening at "+portID);