Template.listHosting.helpers({
    nextFolderAsObject: function () {
        return {
            f: this._id
        };
    },
    fileSize: function () {
        return formatBytes(this.file.size());
    }
});

Template.listHosting.events({
    'click .decrypt': function () {
        var self = this;
        var url = this.file.url();

        EncryptionService.needSessionInfo(function () {
            var downloadNotification = notification('Downloading...', 'info', {timeout: 'none'});
            HTTP.get(url, {}, function (err, result) {
                sAlert.close(downloadNotification);
                if (err) {
                    return;
                }

                var decryptNotification = notification('Decrypting... Please wait', 'warning', {timeout: 'none'});

                // long JS action freezing other JS scripts
                Meteor.setTimeout(function () {
                    var decrypted = EncryptionService.decryptFile(result.content);
                    sAlert.close(decryptNotification);

                    if (decrypted) {
                        // FileSaver.js giving the file to user
                        saveAs(decrypted, self.name);
                    }
                }, 500);
            });
        });
    }
});