/* global Receipts */

/*

    receipt = {
        id: ...,
        userId: this.userId,
        amount: 90.00,
        description: "Nespresso Pods",
        addedDate: date,
        paidDate: null or date
    }
    
    paidDate = {
        null: "Still outstanding, calculated in current balance",
        Date(): "Date the receipt was paid"
    }

*/
Receipts = new Mongo.Collection('receipts');

Meteor.methods({
    addReceipt: function(receipt) {
        check(receipt,{
            amount: Number,
            description: String
        });
        receipt.user = {
            name: Meteor.user().profile.name,
            tag: Meteor.user().profile.tag,
            colour: Meteor.user().profile.colour
        };
        receipt.addedDate = Date();
        receipt.paidDate = null;
        Receipts.insert(receipt);
    },
    checkOut: function() {
        if(!Meteor.userId()) return;
        Receipts.update({paidDate: null}, {$set: {paidDate: Date()}}, {multi: true});
    }
});