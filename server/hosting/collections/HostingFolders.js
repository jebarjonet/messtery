HostingFolders = new Mongo.Collection("hostingfolders");

HostingFoldersSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    createdAt: {
        type: Date
    },
    parent: {
        type: String,
        optional: true
    }
});

HostingFolders.attachSchema(HostingFoldersSchema);