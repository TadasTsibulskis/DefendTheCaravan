'use strict';

module.exports = function(grunt) {
    grunt.registerTask('submitDeployTicket', function() {
        this.requiresConfig('currentFile.status');

        var status = grunt.config.get('currentFile.status');
        if (status === 'new') {
            grunt.task.run('jira:createDeployTicket');
            grunt.task.run('recordTicketKey');
        } else if (status === 'change') {
            grunt.task.run('jira:updateDeployTicket');
            grunt.task.run('recordTicketKey');
        } else if (status === 'no-change') {
            grunt.task.run('recordTicketKey');
        }
    });
};
