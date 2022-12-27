const http = require('http');
const fs = require('fs');
const port = 3001;
http.createServer(function(request, response) {
    if (request.url === '/') {
        request.url = 'index.html';
    }
    fs.readFile('./' + request.url, function(err, data) {
        if (!err) {
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1 ?
                'text/plain' : {
                    '.html': 'text/html',
                    '.ico': 'image/x-icon',
                    '.jpg': 'image/jpeg',
                    '.png': 'image/png',
                    '.svg': 'image/svg+xml',
                    '.gif': 'image/gif',
                    '.css': 'text/css',
                    '.js': 'text/javascript'
                }[request.url.substr(dotoffset)];
            if (mimetype !== undefined) {
                response.setHeader('Content-type', mimetype);
            } else {}
            response.end(data);
        } else {
            response.writeHead(404, "Not Found");
            response.end();
        }
    });
}).listen(port);