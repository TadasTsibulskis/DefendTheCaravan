'use strict';

var getVersion = require('../helpers/get-version');

module.exports = {
    checkoutDist: {
        command: function() {
            return 'rm -rf dist; svn checkout https://scm.overstock.com/repos/WEB/creative/trunk/www/jenkins/checkout/dist';
        }
    },

    // Commit built files
    commit: {
        command: function() {
            return 'cd dist; svn update; svn add . --force; ' +
                'svn commit -m "Built files ' + getVersion() + '"';
        }
    },

    // Pull down index file
    refreshIndex: {
        command: 'curl -A "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) ' +
            'AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53" ' +
            'http://www.overstock.com > test/fixtures/index.html'
    },

    commitGit: {
        command: function() {
            return 'git pull origin HEAD; ' +
                'git commit package.json ' +
                '-m "Increment release to ' + getVersion() + '"; ' +
                'git push origin HEAD;';
        }
    },

    notifySlack: {
        command: function() {
            var coeff = 1000 * 60 * 10;
            var date = new Date(); // or use any other date
            var rounded = new Date(Math.ceil(date.getTime() / coeff) * coeff);
            var d = new Date(rounded);
            var hh = d.getHours();
            var m = d.getMinutes();
            var dd = 'am';
            var h = hh;
            if (h >= 12) {
                h = hh - 12;
                dd = 'pm';
            }
            if (h === 0) {
                h = 12;
            }
            var message = h + ':' + ((m === 0) ? '00' : m) + dd;
            return 'curl -X POST -H "Content-Type: application/json" -d \'{"channel": "#fed-builds", "username": "Build Bot", "text": "Grunt Build succeeded! JS & CSS updates (if any) will deploy to test at ' + message + '", "icon_emoji": ":computer:"}\' https://hooks.slack.com/services/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 --insecure';
        }
    },

    stashSuccess: {
        command: 'curl -X POST -H "Content-Type: application/json" -d \'{"channel": "#deploy", "username": "Jenkins", "text": "Build succeeded! \'"$(git log -1 --pretty=%B | sed -n 1p)"\'", "icon_emoji": ":jankins:"}\' https://hooks.slack.com/services/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 --insecure'
    },

    stashFailure: {
        command: 'curl -X POST -H "Content-Type: application/json" -d \'{"channel": "#deploy", "username": "Jenkins", "text": "Build failed!", "icon_emoji": ":jankins:"}\' https://hooks.slack.com/services/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 --insecure'
    }
};
