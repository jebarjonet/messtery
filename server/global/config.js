// update last connection date on login
Accounts.validateLoginAttempt(function (req) {
    // if no user registered
    if (!req.user) {
        return false;
    }

    // if user has been disabled
    if (req.user.disabled) {
        throw new Meteor.Error(403, 'Your account has been disabled');
    }

    Meteor.users.update({
        _id: req.user._id
    }, {
        $set: {
            lastConnectionAt: Date.now()
        }
    });

    return true;
});