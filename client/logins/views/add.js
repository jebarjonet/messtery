AutoForm.addHooks('insertLoginsForm', {
    before: {
        insert: function (doc) {
            doc.salt = EncryptionService.generateDataSalt();
            doc.password = EncryptionService.encrypt(doc.password, doc.salt);
            this.result(doc);
        }
    },
    onSuccess: function () {
        notification('Login added to list', 'success');
        Router.go('logins');
    }
});