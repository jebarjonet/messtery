HostingFiles = new Mongo.Collection("hostingfiles");

HostingFilesSchema = new SimpleSchema({
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

HostingFiles.allow(adminAllow('update insert'));

HostingFiles.attachSchema(HostingFilesSchema);