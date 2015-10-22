Template.deleteHostingModal.events({
    'click button': function () {
        var Entity = this.isFolder ? HostingFolders : HostingFiles;
        Entity.remove(this._id, function (err) {
            if (!err) {
                Modal.hide('deleteHostingModal')
            }
        });
    }
});