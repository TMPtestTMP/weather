var http = require("http");
var server  = new http.Server();
var key = require('./APPID');
var city = require('./city');

server.listen(3000);

server.on('request', function(req,res){

    var options = {
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?q=' + city.name+','+city.country + '&units=metric&APPID=' + key.APPID
    };

    var callback = function(response) {
        var str = '';


        response.on('data', function (chunk) {
            str += chunk;
        });


        response.on('end', function () {

            if (response.statusCode == 200) {

                var info = JSON.parse(str);
                res.end("The temperature in " + city.name + " is " + ((info.main.temp > 0) ? "+" : "") + info.main.temp);

            } else {

                res.writeHead(500);
                res.end("Server error");

            }

        });
    }
    http.request(options, callback).end();
});
