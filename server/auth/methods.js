Meteor.methods({
    // completes a user profile when boarding
    registerUser: function (token, encryption) {
        var user = Meteor.users.findOne({
            "services.password.reset.token": token
        });

        if (!token || !user) {
            throw new Meteor.Error(403, 'Invalid token');
        }

        if (user.encryption) {
            throw new Meteor.Error(403, 'User already validated');
        }

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
            _id: user._id
        }, {
            $set: {
                "encryption.iv": encryption.iv,
                "encryption.key": encryption.key,
                "encryption.passwordValidator": encryption.passwordValidator,
                "encryption.salt": encryption.salt
            }
        });

        return true;
    }
});