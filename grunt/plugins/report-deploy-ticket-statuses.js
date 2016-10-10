'use strict';

var _ = require('lodash');

module.exports = function(grunt) {
    grunt.registerTask('reportDeployTicketStatuses', function() {
        var deployableFiles = grunt.config.get('deployableFiles');

        _.each(deployableFiles, function(deployableFile, deployableFileType) {
            switch (deployableFile.status) {
                case 'new': {
                    if (deployableFile.ticket) {
                        grunt.log.error(deployableFile.filename + ' was submitted for creation (' + deployableFile.ticket.key + ')');
                    } else {
                        grunt.log.error(deployableFile.filename + ' was created');
                    }
                    break;
                }

                case 'change': {
                    if (deployableFile.ticket) {
                        grunt.log.error(deployableFile.filename + ' was submitted for update (' + deployableFile.ticket.key + ')');
                    } else {
                        grunt.log.error(deployableFile.filename + ' was updated');
                    }
                    break;
                }

                case 'no-change': {
                    if (deployableFile.ticket) {
                        grunt.log.ok(deployableFile.filename + ' is up-to-date (' + deployableFile.ticket.key + ')');
                    } else {
                        grunt.log.ok(deployableFile.filename + ' is up-to-date');
                    }
                    break;
                }

                case 'delete': {
                    grunt.log.error(deployableFile.filename + ' was deleted as duplicate');
                    break;
                }

                default: {
                    grunt.fail.fatal(
                        'Well, this is awkward. ' + deployableFile.filename + ' has ' +
                        'an invalid status: ' + deployableFile.status
                    );
                }
            }
        });
    });
};
