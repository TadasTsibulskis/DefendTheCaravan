'use strict';

var fs = require('fs');

module.exports = function(grunt) {
    grunt.registerTask('webcontrolUpdate', function() {
        var done = this.async();

        this.requiresConfig('webcontrol.username');
        this.requiresConfig('webcontrol.password');
        this.requiresConfig('deployableFiles');

        var elementContent = fs.readFileSync(grunt.config.get('deployableFiles.appHtml.currentFilePath')).toString();
        var elementComment =
            grunt.config.get('deployableFiles.appHtml.currentFileVersion') + ' (' +
            grunt.config.get('deployableFiles.appHtml.currentFileMd5') + ')';

        var webdriverio = require('../../test/features/support/webdriverio');
        webdriverio.init(function() {
            var siteElementName = 'MS_01_CONTAINER';
            var world = new (require('../../test/features/support/world.js').World)();
            var navigator = world.navigationController;

            navigator.navigateToPage('webcontrol login page')
            .logIn(
                grunt.config.get('webcontrol.username'),
                grunt.config.get('webcontrol.password')
            )
            .click('search link')
            .click('site elements tab')
            .searchFor(siteElementName)
            .click('search result link')
            .click('edit tab')
            .submitUpdatedContent(
                elementContent,
                elementComment
            )
            // TODO BasePage should add 'then', 'done', and 'fail' callbacks
            // so the client can attach promise callbacks if absolutely necessary
            .notify(function() {
                // webdriverio.getInstance().end(done);
                done();
            });
        });
    });
};
