Meteor.publish('hosting', function () {
    if (!this.userId) {
        return [];
    }
    return [
        Files.find({
            owner: this.userId
        }),
        HostingFiles.find({
            owner: this.userId
        }),
        HostingFolders.find({
            owner: this.userId
        })
    ];
});