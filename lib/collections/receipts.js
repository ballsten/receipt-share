/* global Receipts */

/*

    receipt = {
        id: ...,
        userId: this.userId,
        amount: 90.00,
        description: "Nespresso Pods",
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
        receipt.userId = this.userId;
        receipt.paidDate = null;
        Receipts.insert(receipt);
    }
});