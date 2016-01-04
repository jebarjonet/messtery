FileManipulationService = (function () {
    return {
        upload: upload,
        downloadEncryptedFile: downloadEncryptedFile,
        isFileUploaded: isFileUploaded
    };

    function upload(doc, cbSuccess, cbError) {
        var file = $('[name="file"]')[0].files[0];
        var reader = new FileReader();

        if (file.size > Meteor.settings.public.fileMaxSize) {
            cbError('The file is too big to be uploaded');
            return;
        }

        reader.onload = function (e) {
            var result = e.target.result;

            if (doc.encrypted) {
                var encryptNotification = notification('Encrypting... Please wait', 'warning', {timeout: 'none'});

                // long JS action freezing other JS scripts
                Meteor.setTimeout(function () {
                    var salt_or_encryption = EncryptionService.generateDataSalt();
                    // if doc has an encryption property, it is independent from user. Otherwise we give it a salt
                    if(doc.encryption) {
                        salt_or_encryption = doc.encryption;
                    } else {
                        doc.salt = salt_or_encryption;
                    }
                    result = EncryptionService.encryptFile(result, salt_or_encryption);
                    sAlert.close(encryptNotification);
                    save(result, cbSuccess, cbError);
                }, 500);
            } else {
                save(result, cbSuccess, cbError);
            }
        };

        reader.readAsDataURL(file);
    }

    function save(result, cbSuccess, cbError) {
        var FSFile = new FS.File(result);
        FSFile.owner = Meteor.userId();

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

    function downloadEncryptedFile(url, salt, name) {
        var downloadNotification = notification('Downloading...', 'info', {timeout: 'none'});
        HTTP.get(url, {}, function (err, result) {
            sAlert.close(downloadNotification);
            if (err) {
                return;
            }

            var decryptNotification = notification('Decrypting... Please wait', 'warning', {timeout: 'none'});

            // long JS action freezing other JS scripts
            Meteor.setTimeout(function () {
                var decrypted = EncryptionService.decryptFile(result.content, salt);
                sAlert.close(decryptNotification);

                if (decrypted) {
                    // FileSaver.js giving the file to user
                    saveAs(decrypted, name);
                }
            }, 500);
        });
    }

    function isFileUploaded(fileId) {
        var file = Files.findOne(fileId);
        return file && file.url();
    }
})();