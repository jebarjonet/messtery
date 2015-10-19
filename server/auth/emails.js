// enrollment email
Accounts.urls.enrollAccount = function(token) {
    return Meteor.absoluteUrl('boarding/' + token);
};

// reset password
Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
};