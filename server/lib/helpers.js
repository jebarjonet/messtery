/**
 * check if (current user or passed userId) is admin
 * @param userId
 * @returns {*}
 */
isAdmin = function (userId) {
    var userId = userId ? userId : this.userId;
    return Roles.userIsInRole(userId, 'admin');
};

/**
 * Check if (current user or passed userId) is owner of doc
 * @param userId
 * @param doc
 * @returns {boolean}
 */
isOwner = function (userId, doc) {
    var userId = userId ? userId : this.userId;
    return doc.owner === userId;
};

/**
 * Collections "allow" configs for admin
 * ex: Meteor.users.allow(adminAllow('update remove'));
 * @param options (String)
 */
adminAllow = function (options) {
    options = options.split(' ');
    var res = {};
    _.forEach(options, function (option) {
        res[option] = function (userId) {
            return isAdmin(userId);
        };
    });
    return res;
};

/**
 * Collections "allow" configs for owners
 * ex: Meteor.users.allow(adminAllow('update remove'));
 * @param options
 * @returns {{}}
 */
ownerAllow = function (options) {
    options = options.split(' ');
    var res = {};

    // remove "insert" from options since there is no owner to a new object
    if (~options.indexOf("insert")) {
        res.insert = function (userId) {
            return !!userId;
        };
        _.pull(options, "insert");
    }

    _.forEach(options, function (option) {
        res[option] = function (userId, doc) {
            return isOwner(userId, doc);
        };
    });
    return res;
};