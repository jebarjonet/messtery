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

        EncryptionService.needSessionKeys(function () {
            FileManipulationService.downloadEncryptedFile(url, self.salt, self.name);
        });
    },
    'click .information-action': function () {
        Modal.show('showHostingModal', this);
    },
    'click .move-action': function () {
        Modal.show('moveHostingModal', this);
    },
    'click .update-action': function () {
        Modal.show('updateHostingModal', this);
    },
    'click .delete-action': function () {
        Modal.show('deleteHostingModal', this);
    }
});