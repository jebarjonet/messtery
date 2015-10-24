AutoForm.addHooks('enterPasswordForm', {
    onSubmit: function (doc) {
        this.event.preventDefault();

        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getPasswordValidator(doc.password, encryption.salt);

        if (encryption.passwordValidator !== passwordValidator[1]) {
            this.done(new Meteor.Error(403, 'Wrong password when tried to decrypt'));
            return;
        }

        Modal.hide();
        Session.set('passwordValidator', passwordValidator);
        EncryptionService.executePendingFunction();
        this.done();
    }
});