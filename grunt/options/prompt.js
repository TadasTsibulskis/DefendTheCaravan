module.exports = {
    webControl: {
        options: {
            questions: [{
                config: 'prompt.webControl.username',
                type: 'input',
                message: 'Web Control Username:',
                default: process.env.USER || process.env.USERNAME
            }, {
                config: 'prompt.webControl.password',
                type: 'password',
                message: 'Web Control Password:'
            }, {
                config: 'prompt.webControl.comments',
                type: 'input',
                message: 'Comments/Tickets:'
            }]
        }
    },

    jira: {
        options: {
            questions: [{
                config: 'prompt.jira.username',
                type: 'input',
                message: 'jira Username: ',
                default: process.env.USER || process.env.USERNAME
            }, {
                config: 'prompt.jira.password',
                type: 'password',
                message: 'jira Password:'
            }]
        }
    }
};
