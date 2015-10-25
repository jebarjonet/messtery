Template.logins.helpers({
    forgetSessionKeysDisabled: function () {
        return EncryptionService.getSessionKeys() ? '' : 'disabled';
    }
});

Template.logins.events({
    'click .show-action': function () {
        var self = this;

        EncryptionService.needSessionKeys(function () {
            Modal.show('showLoginModal', decryptedLogin(self));
        });
    },
    'click .delete-action': function () {
        Modal.show('deleteLoginModal', this);
    },
    'click .update-action': function () {
        var self = this;

        EncryptionService.needSessionKeys(function () {
            //Meteor.setTimeout(function () {
            Modal.show('updateLoginModal', decryptedLogin(self));
            //}, 350);
        });
    },
    'click #forget-session-keys': function () {
        EncryptionService.forgetSessionKeys();
    }
});

function decryptedLogin(login) {
    login = _.cloneDeep(login);
    login.password = EncryptionService.decrypt(login.password, login.salt);
    return login;
}