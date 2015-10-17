Template.listHosting.helpers({
    breadcrumbs: function () {
        return generateBreadcrumbs(getCurrentFolder());
    },
    children: function () {
        var currentFolder = getCurrentFolder();
        var query = {};
        if (currentFolder) {
            query.parent = currentFolder
        } else {
            query.parent = {
                $exists: false
            };
        }
        var hostingFolders = HostingFolders.find(query, {
            sort: {
                name: 1
            }
        }).fetch();
        _.forEach(hostingFolders, function (hostingFolder) {
            hostingFolder.isFolder = true;
        });
        var hostingFiles = HostingFiles.find(query, {
            sort: {
                name: 1
            }
        }).fetch();
        _.forEach(hostingFiles, function (hostingFile) {
            hostingFile.file = Files.findOne(hostingFile.file);
        });
        return _.union(hostingFolders, hostingFiles);
    },
    currentFolderAsObject: function () {
        var currentFolder = getCurrentFolder();
        if (currentFolder) {
            return {
                f: currentFolder
            };
        }
        return {};
    },
    nextFolderAsObject: function () {
        return {
            f: this._id
        };
    },
    fileSize: function() {
        return formatBytes(this.file.size());
    }
});

Template.listHosting.events({
    'click .decrypt': function () {
        var self = this;
        var url = 'http://localhost:3000' + this.file.url();

        HTTP.get(url, {}, function (err, result) {
            if (err) {
                return;
            }

            var decryptNotification = notification('Decrypting... Please wait', 'info', {timeout: 'none'});
            Meteor.setTimeout(function() {
                var decrypted = EncryptionService.decryptFile(result.content, 'mapassphrase');
                sAlert.close(decryptNotification);

                if (decrypted) {
                    // FileSaver.js giving the file to user
                    saveAs(decrypted, self.name);
                }
            }, 500);
        });
    }
});

function getCurrentFolder() {
    return Router.current().params.query.f;
}

function generateBreadcrumbs(folderId, breadcrumbs) {
    breadcrumbs = breadcrumbs ? breadcrumbs : [];
    var folder = HostingFolders.findOne(folderId);

    if (folder) {
        breadcrumbs.unshift(folder);
        if (folder.parent) {
            return generateBreadcrumbs(folder.parent, breadcrumbs);
        }
    }

    return breadcrumbs;
}