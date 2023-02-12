var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-type": "text/html"});
    if('id' in params && 'login' in params) {
        res.write('id: ' + params['id']);
    }
    else{
        res.write('write id and login');
    }
    console.log(page);
    res.write('<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
            '<meta charset="utf-8" />' +
            '<title>My Node.js page!</title>' +
            '</head>' +
            '<body>' +
            '<p>Here is a paragraph of <strong>HTML</strong>!</p>' +
            '</body>' +
            '</html>');
     /*       if(page == '/'){
                res.write('You\'re at the reception desk. How can I help you?');
            }
            else if(page == '/basement'){
                res.write('You\'re in the wine cellar. These bottles are mine!');
            }
            else if(page == '/floor/1/bedroom'){
                res.write('Hey, this is a private area!');
            }else{
                res.write('404');
            } */
    res.end();
});
server.listen(8080);