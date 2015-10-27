UserEncryptionSchema = new SimpleSchema({
    iv: {
        type: String
    },
    key: {
        type: String
    },
    passwordValidator: {
        type: String
    },
    salt: {
        type: String
    }
});

UserSchema = new SimpleSchema({
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        optional: true
    },
    lastConnectionAt: {
        type: Date,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    encryption: {
        type: UserEncryptionSchema,
        optional: true
    },
    roles: {
        type: [String],
        optional: true
    },
    activated: {
        type: Boolean,
        optional: true
    },
    disabled: {
        type: Boolean,
        optional: true
    }
});

Meteor.users.allow({
    update: function (userId) {
        return isAdmin(userId);
    },
    remove: function (userId, user) {
        return isAdmin(userId) && !isAdmin(user._id);
    }
});

Meteor.users.attachSchema(UserSchema);