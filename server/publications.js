/* global Receipts */

Meteor.publish("currentReceipts", function() {
    return Receipts.find({paidDate: null});
})

Meteor.publish("allUsers", function() {
    return Meteor.users.find({});
});