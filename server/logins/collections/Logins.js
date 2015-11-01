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
    salt: {
        type: String
    }
});

Logins.allow(adminAllow('update insert remove'));

Logins.attachSchema(LoginsSchema);