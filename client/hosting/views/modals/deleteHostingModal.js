Template.deleteHostingModal.events({
    'click button': function () {
        Meteor.call('removeHostingObject', this, function (err) {
            if (err) {
                notification(err.reason);
            } else {
                Modal.hide('deleteHostingModal')
            }
        });
    }
});