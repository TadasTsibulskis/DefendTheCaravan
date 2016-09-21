'use strict';

module.exports = function(grunt) {
    grunt.registerTask('recordTicketKey', function() {
        this.requiresConfig('currentFile.ticket');

        grunt.config.set(
            grunt.config.process('deployableFiles.<%= currentFile.fileKey %>.ticket'),
            grunt.config.get('currentFile.ticket')
        );
    });
};
