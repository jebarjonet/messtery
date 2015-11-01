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
 * collections "allow" configs for admin
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