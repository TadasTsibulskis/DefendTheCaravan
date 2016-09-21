'use strict';

var _ = require('lodash');

module.exports = function(grunt) {
    grunt.registerTask('deploy', function() {
        this.requiresConfig('deployableFiles');

        var deployableFiles = grunt.config.get('deployableFiles');

        _.each(deployableFiles, function(deployableFile, deployableFileType) {
            grunt.task.run('setCurrentFile:' + deployableFileType);

            // If this file has been configured for a jira ticket
            if (deployableFile.ticketTitle) {
                grunt.task.run('jira:searchOpenDeployTicket');
            }

            grunt.task.run('configureDeployTicketSubmission');

            if (deployableFile.ticketTitle) {
                // Submit to Jira
                grunt.task.run('submitDeployTicket');
            } else {
                // Submit to webcontrol
                grunt.task.run('updateSiteElement');
            }
        });
    });
};
