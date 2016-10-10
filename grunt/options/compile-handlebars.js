'use strict';

module.exports = {
    container: {
        files: [{
            src: 'static/MS_01_CONTAINER.hbs',
            dest: '<%= deployableFiles.appHtml.fullPathUnmin %>'
        }],

        templateData: {
            appCssExt: '<%= deployableFiles.appCss.currentDeployedFilePath %>',
            appJsExt: '<%= deployableFiles.appJs.currentDeployedFilePath %>'
        },

        partials: [
            'static/*.hbs'
        ]
    }
};
