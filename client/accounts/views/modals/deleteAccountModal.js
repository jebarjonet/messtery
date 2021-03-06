Template.deleteAccountModal.events({
    'click button': function () {
        Meteor.users.remove(this._id, function (err) {
            if (err) {
                notification(err.reason);
                return;
            }

            notification("Account deleted", "success");
            Modal.hide();
        });
    }
});