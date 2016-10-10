'use strict';

var deployTime = require('../helpers/get-deploy-datetime');

module.exports = function(grunt) {
    grunt.registerTask('configureDeployTicketSubmission', function() {
        // Preconditions to run
        this.requiresConfig('currentFile');

        var currentFile = grunt.config.get('currentFile');
        var searchResults = grunt.config.get('jira.deployTickets.openSearch') || {issues: []};
        var ticket = searchResults.issues[0];

        // Get details from the found ticket
        var ticketMd5;
        var ticketDeployTime;
        if (ticket) {
            ticketMd5 = ticket.fields['customfield_10215']; // "Approved MD5"
            ticketDeployTime = ticket.fields['customfield_10360']; // "Deploy Date/Time"
            // Store the ticket in the currentFile
            grunt.config.set('currentFile.ticket', ticket);
        }

        var status = 'pending';
        var assignee = 'testdeploy';
        if (currentFile.status === 'delete') {
            // Nothing needs to happen because the file was deleted as duplicate
            assignee = '<%= prompt.jira.username %>';
            status = 'delete';
        } else if (currentFile.ticketTitle) {
            // Flow related to files with jira tickets
            if (!ticket) {
                // A ticket needs to be created
                status = 'new';
            } else if (ticketMd5 !== currentFile.currentMd5) {
                // Existing ticket needs to be updated because it has an old MD5
                status = 'change';
            } else if (ticketDeployTime !== deployTime) {
                // Existing ticket needs to be updated because it has an old deploy time
                status = 'change';
            } else {
                // Nothing needs to happen because the ticket is set up correctly
                status = 'no-change';
            }
        } else {
            // Non-jira files
            if (!currentFile.originalMd5) {
                status = 'new';
            } else if (currentFile.originalMd5 === currentFile.currentMd5) {
                status = 'no-change';
            } else {
                status = 'change';
            }
        }

        // Set the file status
        grunt.config.set('currentFile.status', status);
        // Set the status on the "permanent" deployableFile too
        grunt.config.set(
            grunt.config.process('deployableFiles.<%= currentFile.fileKey %>.status'),
            status
        );
        grunt.config.set('currentFile.assignee', assignee);
    });
};
