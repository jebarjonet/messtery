HostingFiles = new Mongo.Collection("hostingfiles");

HostingFilesSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    owner: {
        type: String,
        optional: true
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
    doc.owner = userId;
    doc.createdAt = Date.now();
});

HostingFiles.allow(ownerAllow('update insert'));

HostingFiles.attachSchema(HostingFilesSchema);