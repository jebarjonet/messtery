Files.allow({
    update: function (userId) {
        return isAdmin(userId);
    },
    remove: function (userId) {
        return isAdmin(userId);
    },
    insert: function (userId) {
        return isAdmin(userId);
    },
    download: function (userId) {
        return isAdmin(userId);
    }
});