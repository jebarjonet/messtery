// check if (current user or passed userId) is admin
isAdmin = function(userId) {
    var userId = userId ? userId : Meteor.userId();
    return Roles.userIsInRole(userId, 'admin');
};