'use strict';

var Q = require('q');
var _ = require('lodash');
var http = require('http');

module.exports = function(grunt) {
    grunt.registerTask('verify', function() {
        var done = this.async();
        var urlPrefix = 'http://ak1.ostkcdn.com/';
        var deployableFiles = grunt.config.get('deployableFiles');

        function getUrl(url) {
            return new Q.Promise(function(resolve, reject) {
                http.get(url, function(res) {
                    // note this will _not_ wait for the whole request
                    // but just the headers.
                    if (res.statusCode === 200) {
                        resolve(grunt.log.oklns(url + ' was found'));
                    } else {
                        resolve(grunt.log.error(url + ' was NOT found'));
                    }
                    // else reject();
                });
            });
        }

        var pings = _.map(deployableFiles, function(file) {
            var path =  file.filetype + '/' +
                file.filename;

            return getUrl(urlPrefix + path);
        });

        Q.all(pings).then(function(response) {
            done();
        }).catch(function(reason) {
            grunt.log.error(reason);
            // There was an error somewhere
            // this would happen as soon as _one_ promise rejected
            // but we're not rejecting promises at this point
            return done(false);
        });
    });
};
