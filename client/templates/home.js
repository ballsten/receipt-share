/* global Template */
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
           //userId: "empty",
           description: "empty",
           amount: ["number", "empty", "greaterThanZero"]
       } 
    });
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
    }
});