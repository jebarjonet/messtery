Files = new FS.Collection('files', {
    chunkSize: 1024 * 1024,
    filter: {
        // max file size
        maxSize: Meteor.settings.public.fileMaxSize
    },
    stores: [
        new FS.Store.GridFS('files')
    ]
});