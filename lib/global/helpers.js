// check if (current user or passed user) is activated
isActivated = function(user) {
    user = user ? user : Meteor.user();
    return user && user.isActivated;
};