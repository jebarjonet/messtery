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
            uploadFile(doc, function (fileObj) {
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
        if (!isFileUploaded(HostingFiles.findOne(result).file)) {
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

function uploadFile(doc, cbSuccess, cbError) {
    var file = $('[name="file"]')[0].files[0];
    var reader = new FileReader();

    if (file.size > appConfig.fileMaxSize) {
        cbError('The file is too big to be uploaded');
        return;
    }

    reader.onload = function (e) {
        var result = e.target.result;

        if (doc.encrypted) {
            var encryptNotification = notification('Encrypting... Please wait', 'warning', {timeout: 'none'});

            // long JS action freezing other JS scripts
            Meteor.setTimeout(function () {
                result = EncryptionService.encryptFile(result);
                sAlert.close(encryptNotification);
                saveResult(result, cbSuccess, cbError);
            }, 500);
        } else {
            saveResult(result, cbSuccess, cbError);
        }
    };

    reader.readAsDataURL(file);
}

function saveResult(result, cbSuccess, cbError) {
    var FSFile = new FS.File(result);

    Files.insert(FSFile, function (err, fileObj) {
        if (err) {
            cbError(err.reason);
            return;
        }

        cbSuccess(fileObj);

        // waiting for file to be uploaded
        Tracker.autorun(function (c) {
            if (isFileUploaded(fileObj._id)) {
                notification('File saved', 'success');
                c.stop();
            }
        });
    });
}

function isFileUploaded(fileId) {
    var file = Files.findOne(fileId);
    return file && file.url();
}