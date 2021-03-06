AutoForm.addHooks('boardingForm', {
    onSubmit: function (doc) {
        var self = this;
        this.event.preventDefault();

        var token = FlowRouter.getParam("token");
        var encryption = EncryptionService.setupUserEncryptionInfo(doc.password);

        Meteor.call('registerUser', token, encryption, function (err) {
            if (err) {
                self.done(err);
            }

            Accounts.resetPassword(token, doc.password, function (err) {
                self.done(err);
            });
        });
    },
    onSuccess: function () {
        notification('Your account is now completed', 'success');
        FlowFlowRouter.go('hosting');
    }
});