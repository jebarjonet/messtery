// check if (current user or passed userId) is admin
isAdmin = function (userId) {
    var userId = userId ? userId : this.userId;
    return Roles.userIsInRole(userId, 'admin');
};