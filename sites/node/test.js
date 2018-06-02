var http = require("http");
var server = http.createServer(function (req, res){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Node.js h1</h1>");
    res.write(URL("../test/test.html"));
    res.end();
});

server.listen(8080);