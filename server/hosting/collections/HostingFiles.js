HostingFiles = new Mongo.Collection("hostingfiles");

HostingFileSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    createdAt: {
        type: Date,
        optional: true
    },
    file: {
        type: String
    },
    parent: {
        type: String,
        optional: true
    },
    encrypted: {
        type: Boolean
    },
    salt: {
        type: String,
        optional: true
    }
});

HostingFiles.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
});

HostingFiles.allow({
    update: function (userId) {
        return isAdmin(userId);
    },
    insert: function (userId) {
        return isAdmin(userId);
    }
});

HostingFiles.attachSchema(HostingFileSchema);