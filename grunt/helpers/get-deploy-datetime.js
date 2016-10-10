'use strict';

module.exports = (function() {
    // Generate deploy date
    var today = new Date();
    today.setHours(16 - (today.getTimezoneOffset() / 60));
    today.setMinutes(0);
    today.setSeconds(0);
    // Jira is stupid.
    var datetime = today.toISOString().replace('Z', '-0' + (today.getTimezoneOffset() / 60) + '00');
    datetime = datetime.replace(/\.\d+/, '.000');

    return datetime;
})();
