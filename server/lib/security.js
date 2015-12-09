onlyUsers = function () {
    // If not logged in, forbid
    if (!Meteor.user()) {
        throw new Meteor.Error(403, "You need to be logged in");
    }
};

onlyAdmins = function () {
    onlyUsers();

    // If not admin, forbid
    if (!isAdmin(Meteor.userId())) {
        throw new Meteor.Error(403, "You need to be admin");
    }
};