Meteor.publish(null, function () {
    return [
        HostingFiles.find(),
        HostingFolders.find()
    ];
});