// update last connection date on login
Accounts.validateLoginAttempt(function (req) {
    // if no user registered
    if (!req.user) {
        return false;
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