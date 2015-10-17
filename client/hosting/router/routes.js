Router.map(function () {
    this.route('/hosting', {
        template: 'listHosting'
    });
    this.route('/hosting/addFolder', {
        name: 'hosting.addFolder',
        onRun: ifParentFolderExists
    });
    this.route('/hosting/addFile', {
        name: 'hosting.addFile',
        onRun: ifParentFolderExists
    });
    this.route('/hosting/search/:query', {
        name: 'hosting.search'
    });
});

function ifParentFolderExists() {
    var parentFolder = this.params.query.f;
    if(!parentFolder) {
        this.next();
    } else if (HostingFolders.find().count() && HostingFolders.findOne(parentFolder)) {
        this.next();
    } else {
        this.redirect('hosting');
        notification("The requested folder does not exist");
    }
}