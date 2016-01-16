/*global Router*/

/* require login */
var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function() {
      if (!Meteor.userId()) {
        this.render('landing');
      } else {
        this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired);

Router.route('/', {
  waitOn: function() {
    Meteor.subscribe('allUsers');
    return Meteor.subscribe('currentReceipts');
  },
  action: function() {
    this.render("home");
  }
}, {
  name: "home"
});