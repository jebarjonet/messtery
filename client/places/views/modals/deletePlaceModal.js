Template.deletePlaceModal.events({
    'click button': function () {
        Places.remove(this._id, function (err) {
            if (err) {
                notification(err.reason);
                return;
            }

            notification("Place deleted", "success");
            Modal.hide();
        });
    }
});