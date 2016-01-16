Template.authPanel.events({
    'submit form.login': function(e) {
        e.preventDefault();
        Meteor.loginWithPassword($('input.login.username').val(), $('input.login.password').val(), 
        function(err) {
            if(err) console.log('login error ' + err);;
        });
    },
    'click div.login.button': function(e) {
        console.log('click');
        $('form.login').submit();
    },
    'click div.logout.button': function(e) {
        Meteor.logout( 
        function(err) {
            if(err) console.log('logout error ' + err);
        });
    }
});