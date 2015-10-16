Files = new FS.Collection('files', {
    stores: [
        new FS.Store.GridFS('files')
    ]
});

Files.allow({
    update: function (userId, doc) {
        //return doc.owner === userId;
        return true;
    },
    remove: function (userId, doc) {
        //return doc.owner === userId;
        return true;
    },
    insert: function (userId, doc) {
        //return !!userId && !!doc.owner;
        return true;
    },
    download: function (userId, doc) {
        //return doc.owner === userId;
        return true;
    }
});