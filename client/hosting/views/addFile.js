Template.addFileHosting.helpers({
    previousFolderAsObject: function () {
        return getParentFolder() ? {f: getParentFolder()} : {};
    },
    needsEncryption: function () {
        return AutoForm.getFieldValue('encrypted', 'insertHostingFilesForm');
    }
});

AutoForm.addHooks('insertHostingFilesForm', {
    before: {
        insert: function (doc) {
            var self = this;

            // tries to upload file
            FileManipulationService.upload(doc, function (fileObj) {
                doc.file = fileObj._id;
                if (getParentFolder()) {
                    doc.parent = getParentFolder();
                }
                self.result(doc);
            }, function (err) {
                notification(err);
                self.result(false);
            });
        }
    },
    onSuccess: function (t, result) {
        if (!FileManipulationService.isFileUploaded(HostingFiles.findOne(result).file)) {
            notification('Sending file', 'info');
        }
        if (getParentFolder()) {
            Router.go('hosting', {}, {
                query: 'f=' + getParentFolder()
            });
        } else {
            Router.go('hosting');
        }
    }
});

function getParentFolder() {
    var parentFolder = Router.current().params.query.f;
    return parentFolder ? parentFolder : undefined;
}