'use strict';

// Compile handlebars into JS
module.exports = {
    compile: {
        options: {
            processContent: function(content) {
                // remove leading and trailing spaces to shorten templates.
                content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
                content = content.replace(/^[\t\r\n]+/mg, '').replace(/[\t\r\n]*$/mg, '');
                content = content.replace(/<!--[\s\S]*?-->/g, '');
                content = content.replace(/[\n]/g, '');

                return content;
            },

            processName: function(filename) {
                // Include the folders within templates in template name
                var filenameParts = filename.split('/');
                var templatesIndex = filenameParts.indexOf('templates');
                var namespaceParts = filenameParts.slice(templatesIndex + 1);
                var moduleFolderName = filenameParts[1];
                var folderNameParts = moduleFolderName.split('-');
                var folderName = folderNameParts[0];

                if (folderNameParts.length > 1) {
                    for (var i = 1; i < folderNameParts.length; i++) {
                        folderName += folderNameParts[i].charAt(0).toUpperCase() + folderNameParts[i].slice(1);
                    }
                }

                // Uppercase each part
                // for (var j = 0; j < namespaceParts.length; j++) {
                //     namespaceParts[j] = namespaceParts[j].charAt(0).toUpperCase() + namespaceParts[j].slice(1);
                // }

                // Compile into final template name
                filename = namespaceParts.join('');
                filename = filename.substring(0, filename.indexOf('.'));

                return filename;
            },

            processPartialName: function(filePath) { // input:  templates/_header.hbs
                var pieces = filePath.split('/');
                var filename = pieces[pieces.length - 1];
                filename = filename.substring(0, filename.indexOf('.'));

                return filename; // output: _header.hbs
            },

            namespace: 'Handlebars.templates',
            wrapped: true
        },

        files: {
            'tmp/templates.js': ['src/**/templates/*.hbs']
        }
    }
};
