Router.map(function () {
    this.route('/hosting', {
        waitOn: sub
    });
    this.route('/hosting/add-folder', {
        name: 'hosting.addFolder',
        onRun: ifParentFolderExists,
        waitOn: sub
    });
    this.route('/hosting/add-file', {
        name: 'hosting.addFile',
        onRun: ifParentFolderExists,
        waitOn: sub
    });
    this.route('/hosting/search/:terms', {
        name: 'hosting.search',
        template: 'hosting',
        waitOn: sub
    });
});

function ifParentFolderExists() {
    var parentFolder = this.params.query.f;
    if (!parentFolder) {
        this.next();
    } else if (!Meteor.status().connected || (Meteor.status().connected && HostingFolders.find().count() && HostingFolders.findOne(parentFolder))) {
        this.next();
    } else {
        this.redirect('hosting');
        notification("The requested folder does not exist");
    }
}

function sub() {
    return Meteor.subscribe('hosting');
}