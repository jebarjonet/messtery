Template.deleteHostingModal.events({
    'click button': function () {
        if (this.isFolder) {
            HostingFolders.remove(this._id);
        } else {
            HostingFiles.remove(this._id);
        }
        Modal.hide('deleteHostingModal');
    }
});