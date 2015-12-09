Logins = new Mongo.Collection("logins");

LoginsSchema = new SimpleSchema({
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
    },
    owner: {
        type: String,
        optional: true
    },
    salt: {
        type: String
    }
});

Logins.before.insert(function (userId, doc) {
    doc.owner = userId;
});

Logins.allow(ownerAllow('update insert remove'));

Logins.attachSchema(LoginsSchema);