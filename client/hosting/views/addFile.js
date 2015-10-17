Template.addFileHosting.helpers({
    previousFolderAsObject: function () {
        return {
            f: getParentFolder()
        };
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
            }, function () {
                self.result(false);
            });
        }
    },
    onSuccess: function () {
        notification('File saved', 'success');
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
        notification('The file is too big to be uploaded');
        cbError();
        return;
    }

    reader.onload = function (e) {
        var result = e.target.result;

        if (doc.encrypted) {
            var encryptNotification = notification('Encrypting... Please wait', 'info', {timeout: 'none'});

            Meteor.setTimeout(function () {
                result = EncryptionService.encryptFile(result, 'mapassphrase');
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
            notification(err.reason);
            cbError();
            return;
        }

        cbSuccess(fileObj);
    });
}