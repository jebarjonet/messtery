HostingFolders = new Mongo.Collection("hostingfolders");

HostingFoldersSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    owner: {
        type: String,
        optional: true
    },
    parent: {
        type: String,
        optional: true
    }
});

HostingFolders.before.insert(function (userId, doc) {
    doc.owner = userId;
});

HostingFolders.allow(ownerAllow('update insert'));

HostingFolders.attachSchema(HostingFoldersSchema);