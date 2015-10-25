AutoForm.addHooks('updateLoginForm', {
    before: {
        update: function (doc) {
            doc.$set.salt = EncryptionService.generateDataSalt();
            doc.$set.password = EncryptionService.encrypt(doc.$set.password, doc.$set.salt);
            this.result(doc);
        }
    },
    onSuccess: function () {
        notification('Login updated', 'success');
        Modal.hide(findParentTemplate('updateLoginModal', this.template, true));
    }
});