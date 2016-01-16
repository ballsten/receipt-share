/* global Template, Receipts, _ */
$.fn.form.settings.rules.greaterThanZero = function(value) {
    return value > 0;
}
$.fn.form.settings.prompt.greaterThanZero = "{name} must be greater than zero";

Template.home.onRendered(function() {
    this.addReceipt = "hidden";
    $('#add-receipt-form').hide();
    
    $('.ui.dropdown').dropdown();
    
    $('.ui.form').form({
       fields: {
           description: "empty",
           amount: ["number", "empty", "greaterThanZero"]
       } 
    });
});

Template.home.helpers({
    'currentReceipts': function() {
        return Receipts.find();
    },
    'currentDebt': function() {
        var ledger = [];
        var people = Meteor.users.find().count();
        Meteor.users.find().forEach(function(user) {
           ledger.push({name: user.profile.name, debt: 0});
        }); 
        Receipts.find().forEach(function(receipt) {
            _.each(ledger, function(a) {
                if(a.name == receipt.user.name)
                    a.debt -= receipt.amount/people;
                else
                    a.debt += receipt.amount/people;
            });
        });
        return _.max(ledger, function(a) { return a.debt });
    }
});

Template.home.events({
    'click #add-receipt-button': function(event, template) {
        if(template.addReceipt == "hidden") {
            template.addReceipt = "visibile";
            $('#add-receipt-form').show(500);
        } else {
            $('.ui.form').submit();
        }
    },
    'submit .ui.form': function(event, template) {
        event.preventDefault();
        
        var form = $('.ui.form');
        var data = form.form('get values', ['description', 'amount']);
        data.amount = Number(data.amount);
        
        Meteor.call('addReceipt', data);
        
        template.addReceipt = "hidden";
        $('#add-receipt-form').hide(500);
        
        form.form('reset');
    },
    'click #check-out-button': function(event, template) {
        $('.ui.basic.modal').modal('show');
        $('#modal-no-button').on('click', function(event, template) {
            $('.ui.basic.modal').modal('hide');
        });
        $('#modal-yes-button').on('click', function(event, template) {
            Meteor.call('checkOut');
            $('.ui.basic.modal').modal('hide');
        });
    }
});