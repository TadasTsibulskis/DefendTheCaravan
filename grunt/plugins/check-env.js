'use strict';

var Q = require('q');
var http = require('http');

module.exports = function(grunt) {
    grunt.registerTask('checkEnv', function() {
        var done = this.async();
        var url = 'http://www.overstock.com/?page=dispel&element=MS_01_CSS_EXT&sec_segment=0';

        function getUrl(url) {
            return new Q.Promise(function(resolve, reject) {
                http.get(url, function(res) {
                    // Buffer that thang.
                    var bodyChunks = [];
                    res.on('data', function(chunk) {
                        bodyChunks.push(chunk);
                    }).on('end', function() {
                        var body = Buffer.concat(bodyChunks);
                        // Coercion! Coercion. (To the tune of "Tradition")
                        resolve('' + body);
                    });
                });
            });
        }

        var request = getUrl(url);

        request.then(function(response) {
            var re = /test[0-9]/gi;

            if (response.match(re)) {
                grunt.log.error('Host file is not pointed to production server!');
            } else {
                grunt.log.oklns('Host file appears sane.');
                done();
            }
        });
    });
};
