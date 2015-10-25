AutoForm.addHooks('updateHostingForm', {
    onSubmit: function (doc) {
        var self = this;
        this.event.preventDefault();

        var object = Template.parentData(5);
        var Entity = object.isFolder ? HostingFolders : HostingFiles;
        Entity.update({
            _id: object._id
        }, {
            $set: doc
        }, function (err) {
            if (!err) {
                Modal.hide();
            }

            self.done(err);
        });
    }
});