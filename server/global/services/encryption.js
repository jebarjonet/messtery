EncryptionService = {
    setUserEncryptionInfo: function(encryption, userId) {
        var encryptionFormat = {
            iv: String,
            key: String,
            passwordValidator: String,
            salt: String
        };

        if (!Match.test(encryption, encryptionFormat)) {
            throw new Meteor.Error(403, 'Sent encryption data is not valid');
        }

        // add client generated encryption info to profile
        Meteor.users.update({
            _id: userId
        }, {
            $set: {
                "encryption.iv": encryption.iv,
                "encryption.key": encryption.key,
                "encryption.passwordValidator": encryption.passwordValidator,
                "encryption.salt": encryption.salt
            }
        });
    }
};