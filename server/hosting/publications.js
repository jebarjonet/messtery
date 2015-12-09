Meteor.publish('hosting', function () {
    if (!this.userId) {
        return [];
    }
    return [
        Files.find(),
        HostingFiles.find({
            owner: this.userId
        }),
        HostingFolders.find({
            owner: this.userId
        })
    ];
});