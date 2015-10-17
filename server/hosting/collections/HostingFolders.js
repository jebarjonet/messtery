HostingFolders = new Mongo.Collection("hostingfolders");

HostingFoldersSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    createdAt: {
        type: Date,
        optional: true
    },
    parent: {
        type: String,
        optional: true
    }
});

HostingFolders.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
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