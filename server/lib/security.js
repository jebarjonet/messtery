/**
 * Temporary disabled
 */
disabledMethod = function () {
    throw new Meteor.Error(403, "This function is temporary disabled");
};

/**
 * Only users can continue
 */
onlyUsers = function () {
    // If not logged in, forbid
    if (!Meteor.user()) {
        throw new Meteor.Error(403, "You need to be logged in");
    }
};

/**
 * Only admins can continue
 */
onlyAdmins = function () {
    onlyUsers();

    // If not admin, forbid
    if (!isAdmin(Meteor.userId())) {
        throw new Meteor.Error(403, "You need to be admin");
    }
};