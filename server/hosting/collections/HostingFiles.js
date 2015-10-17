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
    }
});

HostingFiles.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
});

HostingFiles.allow({
    update: function (userId) {
        //return !!userId;
        return true;
    },
    remove: function (userId) {
        return !!userId;
    },
    insert: function (userId) {
        //return !!userId;
        return true;
    }
});

HostingFiles.attachSchema(HostingFilesSchema);