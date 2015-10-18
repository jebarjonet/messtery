Router.map(function () {
    this.route('/hosting');
    this.route('/hosting/addFolder', {
        name: 'hosting.addFolder',
        onRun: ifParentFolderExists
    });
    this.route('/hosting/addFile', {
        name: 'hosting.addFile',
        onRun: ifParentFolderExists
    });
    this.route('/hosting/search/:terms', {
        name: 'hosting.search',
        template: 'hosting'
    });
});

function ifParentFolderExists() {
    var parentFolder = this.params.query.f;
    if(!parentFolder) {
        this.next();
    } else if (!Meteor.status().connected || (Meteor.status().connected && HostingFolders.find().count() && HostingFolders.findOne(parentFolder))) {
        this.next();
    } else {
        this.redirect('hosting');
        notification("The requested folder does not exist");
    }
}