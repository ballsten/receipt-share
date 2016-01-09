Template.authPanel.events({
    'submit form.login': function(e) {
        Meteor.loginWithPassword($('input.login.username').val(), $('input.login.password').val(), 
        function(err) {
            // TODO: need to display an error message
            console.log('login error ' + err);
        });
    },
    'click div.login.button': function(e) {
        $('form.login').submit();
    },
    'click div.logout.button': function(e) {
        Meteor.logout( 
        function(err) {
            console.log('logout error ' + err);
        });
    }
})