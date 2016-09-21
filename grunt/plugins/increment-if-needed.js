'use strict';

var getVersion = require('../helpers/get-version');

module.exports = function(grunt) {
    grunt.registerTask('incrementIfNeeded', function() {
        this.requiresConfig('jira.deployTickets.closedSearch');

        var closedTickets = grunt.config.get('jira.deployTickets.closedSearch');

        if (closedTickets.total > 0) {
            // If we find a pushed task, it's time to increment
            grunt.task.run('incrementRelease');
        } else {
            // Otherwise, there's nothing to do
            grunt.log.fail('Build left at ' + getVersion());
        }
    });
};
