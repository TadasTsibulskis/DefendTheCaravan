module.exports = {
    options: {
        username: '<%= prompt.webControl.username %>',
        password: '<%= prompt.webControl.password %>',
        comments: '<%= prompt.webControl.comments%>'
    },

    dev: {
        options: {
            serverName: ['newcheckout.test', 'spring.test', 'dogfood.test']
        },

        src: ['./static/**.hbs']
    }
};
