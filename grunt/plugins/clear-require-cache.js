'use strict';

module.exports = function(grunt) {
    grunt.registerTask('clearRequireCache', function() {
        // Reset require cache for the SUT without disturbing other things
        // in the watch task
        Object.keys(require.cache).forEach(function (key) {
            if (!key.match(/node_modules/)) {
                delete require.cache[key];
            }
        });
    });
};
