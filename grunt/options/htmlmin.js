'use strict';

module.exports = {
    prod: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeAttributeQuotes: true,
            removeCDATASectionsFromCDATA: true,
            removeCommentsFromCDATA: true,
            caseSensitive: true
        },
        expand: true,
        src: ['dist/html/!(*.min.html)'],
        rename: function(dest, src, options) {
            return src.replace(/html$/, 'min.html');
        }
    }
};
