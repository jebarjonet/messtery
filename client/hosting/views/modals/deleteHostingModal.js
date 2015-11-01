Template.deleteHostingModal.events({
    'click button': function () {
        var self = this;
        Meteor.call('removeHostingObject', this, function (err) {
            if (err) {
                notification(err.reason);
            } else {
                var type = self.isFolder ? "Folder" : "File";
                notification(type + " deleted", "success");
                Modal.hide()
            }
        });
    }
});