Meteor.publish('hosting', function () {
    return [
        Files.find(),
        HostingFiles.find(),
        HostingFolders.find()
    ];
});