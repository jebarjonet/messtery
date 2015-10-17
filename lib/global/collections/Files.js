Files = new FS.Collection('files', {
    filter: {
        // max 25Mb
        maxSize: 26214400
    },
    stores: [
        new FS.Store.GridFS('files')
    ]
});