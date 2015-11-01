Template.deletePlacesCategoryModal.events({
    'click button': function () {
        PlacesCategories.remove(this._id, function (err) {
            if (err) {
                notification(err.reason);
                return;
            }

            notification("Category deleted", "success");
            Modal.hide();
        });
    }
});