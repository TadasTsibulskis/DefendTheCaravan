'use strict';

module.exports = function(grunt) {
    grunt.registerTask('setCurrentFile', function() {
        // Copy the deployableFile into currentFile. Note that updating
        // currentFile will NOT update the deployableFile.
        grunt.config.set(
            'currentFile',
            grunt.config.get('deployableFiles.' + arguments[0])
        );
        // Store a reference to the file's key so we can find
        // the file's "permanent" location in the config again later
        grunt.config.set('currentFile.fileKey', arguments[0]);
    });
};
