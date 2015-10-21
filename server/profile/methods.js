Meteor.methods({
    // updates a user profile when it changes its password
    changePasswordUser: function (encryption) {
        EncryptionService.setUserEncryptionInfo(encryption, Meteor.userId());
        return true;
    }
});