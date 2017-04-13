var Server = (function () {
    var http = require('http'),
    fs = require('fs');

    function isRestRequest (uri) {
        var res = true;
        
        if (uri.indexOf('.') > -1) {
            res = false;
        }
        
        return res;
    }

    function handleFiles (request, response) {
        console.log('Got request for ' + request.url);
        response.writeHead(200, {});
        fs.readFile('../client/' + request.url.replace('\/', ''), function (err, data) {
            if (err) {
                console.log('[ERROR]: request for ' + request.url);
            } else {
                response.write(data.toString(), function () {         
                    response.end();
                });
            }
        });
    }
        
    function route (request, response) {
        var handlers = {
            '/editTask': editTaskHandler
        };
        
        function editTaskHandler () {
            console.warn('Editing tasks is not implemented');
        }
        
        if (handlers[request.url]) {
            handlers[request.url]();
        } else {
            console.log('[ERROR]: wrong request: ' + request.url);
        }
    }

    http.createServer(function(request, response) {
        if (!isRestRequest(request.url)) {
            handleFiles(request, response);
        } else {
            route(request, response);
        }
    }).listen(3000);
    console.log('Server started');
})();


   