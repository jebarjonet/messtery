Meteor.methods({
    // updates a user profile when it changes its password
    changePasswordUser: function (encryption) {
        onlyUsers();

        EncryptionService.setUserEncryptionInfo(encryption, this.userId);
        return true;
    }
});