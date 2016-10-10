'use strict';

module.exports = function(grunt) {
    // Build task
    grunt.registerTask(
        'jiraCreateTickets',
        [
            'configureDeploy:useVersion',
            'deploy',
            'reportDeployTicketStatuses'
        ]
    );
};
