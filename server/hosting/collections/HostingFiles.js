HostingFiles = new Mongo.Collection("hostingfiles");

HostingFilesSchema = new SimpleSchema({
    name: {
        type: String,
        max: 300
    },
    createdAt: {
        type: Date
    },
    file: {
        type: String
    },
    parent: {
        type: String,
        optional: true
    }
});

HostingFiles.attachSchema(HostingFilesSchema);