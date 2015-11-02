AutoForm.addHooks('changePasswordForm', {
    onSubmit: function (doc) {
        var self = this;
        this.event.preventDefault();

        var encryption = EncryptionService.changePasswordUserEncryptionInfo(doc.oldPassword, doc.newPassword);

        if (!encryption) {
            self.done(true);
            return;
        }

        Accounts.changePassword(doc.oldPassword, doc.newPassword, function (err) {
            if (err) {
                self.done(err);
            }

            Meteor.call('changePasswordUser', encryption, function (err) {
                self.done(err);
            });
        });
    },
    onSuccess: function () {
        notification('Your password has been updated', 'success');
    }
});

Template.profile.events({
    'click .logout-clients-action': function () {
        Meteor.logoutOtherClients(function () {
            notification("All other clients are now disconnected", "success");
        });
    }
});