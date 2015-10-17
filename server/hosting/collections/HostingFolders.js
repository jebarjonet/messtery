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
        //return !!userId;
        return true;
    },
    insert: function (userId) {
        //return !!userId;
        return true;
    }
});

HostingFolders.attachSchema(HostingFoldersSchema);