Meteor.methods({
    // completes a user profile when boarding
    registerUser: function (token, encryption) {
        var user = Meteor.users.findOne({
            "services.password.reset.token": token
        });

        if (!token || !user) {
            throw new Meteor.Error(403, 'Invalid token');
        }

        if (isActivated(user)) {
            throw new Meteor.Error(403, 'User already validated');
        }

        EncryptionService.setUserEncryptionInfo(encryption, user._id);

        Meteor.users.update({
            _id: user._id
        }, {
            $set: {
                activated: true
            }
        });

        return true;
    }
});