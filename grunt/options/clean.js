'use strict';

module.exports = {
    static: {
        src: [
            '<%= deployableFiles.appHtml.fullPath %>',
            '<%= deployableFiles.appHtml.fullPathUnmin %>'
        ]
    }
};
