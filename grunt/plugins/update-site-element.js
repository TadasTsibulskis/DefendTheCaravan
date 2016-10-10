'use strict';

module.exports = function(grunt) {
    grunt.registerTask('updateSiteElement', function() {
        this.requiresConfig('currentFile.status');

        var currentFile = grunt.config.get('currentFile');
        var status = currentFile.status;

        if (status === 'new' || status === 'change') {
            grunt.task.run('exec:stashWebcontrolDeploy:' + currentFile.filename);
        }
    });
};
