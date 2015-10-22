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

HostingFolders.allow({
    update: function (userId) {
        return isAdmin(userId);
    },
    remove: function (userId) {
        return isAdmin(userId);
    },
    insert: function (userId) {
        return isAdmin(userId);
    }
});

HostingFolders.attachSchema(HostingFoldersSchema);