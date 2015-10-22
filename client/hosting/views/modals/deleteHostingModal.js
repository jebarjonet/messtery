Template.deleteHostingModal.events({
    'click button': function () {
        // SERVER METHOD
        // Folder : delete everything in it
        // File : delete FS.File

        Meteor.call('removeHostingObject', this, function (err) {
            if (err) {
                notification(err.reason);
            } else {
                Modal.hide('deleteHostingModal')
            }
        });
    }
});