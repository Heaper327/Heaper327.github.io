var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res){
    fs.readFile("nodeTest.rtf",function(err, data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data.substring(0,10));
        res.end();
    });
});

server.listen(8080);
console.log("Server listening");