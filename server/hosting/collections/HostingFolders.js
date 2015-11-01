HostingFolders = new Mongo.Collection("hostingfolders");

HostingFoldersSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    parent: {
        type: String,
        optional: true
    }
});

HostingFolders.allow(adminAllow('update insert'));

HostingFolders.attachSchema(HostingFoldersSchema);