Meteor.publish('hosting', function () {
    if (!this.userId) {
        return [];
    }
    return [
        Files.find(),
        HostingFiles.find(),
        HostingFolders.find()
    ];
});