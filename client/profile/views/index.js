AutoForm.addHooks('changePasswordForm', {
    onSubmit: function (doc) {
        var self = this;
        this.event.preventDefault();

        var encryption = EncryptionService.changePasswordUserEncryptionInfo(doc.oldPassword, doc.newPassword);

        if (!encryption) {
            self.done(true);
            return;
        }

        Meteor.call('changePasswordUser', encryption, function (err) {
            if (err) {
                self.done(err);
            }

            Accounts.changePassword(doc.oldPassword, doc.newPassword, function (err) {
                self.done(err);
            });
        });
    },
    onSuccess: function () {
        notification('Your password has been updated', 'success');
    }
});