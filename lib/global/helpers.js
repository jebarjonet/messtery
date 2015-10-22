// check if (current user or passed user) is activated
isActivated = function(user) {
    user = user ? user : Meteor.user();
    return user && user.activated;
};

// check if passed user is disabled
isDisabled = function(user) {
    return user && user.disabled;
};