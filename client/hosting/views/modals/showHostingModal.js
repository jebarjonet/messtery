Template.showHostingModal.helpers({
    fileSize: function () {
        return formatBytes(this.file.size());
    },
    parentFolder: function () {
        return this.parent ? HostingFolders.findOne(this.parent).name : false;
    }
});