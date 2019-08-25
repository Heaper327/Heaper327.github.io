var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function(req, res){
    var reqURL = url.parse(req.url);
    var filePath = "." + reqURL.pathname + ".txt"
    fs.readFile (filePath, function(err, data){
        if (err) {
            res.writeHead(404,{'Content-Type':"text/html"});
            res.write("404 file not found");
            return res.end();
        }else{
            res.writeHead(200,{'Content-Type':"text/html"});
            var nextButton = "<a href=\""+ (parseInt(reqURL.pathname.substring(1))+1) +"\"> next </a>";
            res.write(nextButton);
            res.write(data);
            res.write(nextButton);
            return res.end();
        }
    })
});

server.listen(8080);