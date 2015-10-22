Files = new FS.Collection('files', {
    chunkSize: 1024 * 1024,
    filter: {
        // max 25Mb
        maxSize: 1024 * 1024 * 25
    },
    stores: [
        new FS.Store.GridFS('files')
    ]
});