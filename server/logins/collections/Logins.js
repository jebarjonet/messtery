Logins = new Mongo.Collection("logins");

LoginSchema = new SimpleSchema({
    domain: {
        type: String,
        max: 300
    },
    identifier: {
        type: String,
        max: 300
    },
    password: {
        type: String
    }
});

Logins.allow({
    update: function (userId) {
        return isAdmin(userId);
    },
    insert: function (userId) {
        return isAdmin(userId);
    },
    remove: function (userId) {
        return isAdmin(userId);
    }
});

Logins.attachSchema(LoginSchema);