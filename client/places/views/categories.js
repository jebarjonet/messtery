Template.categoriesPlaces.events({
    'click .delete-action': function () {
        Modal.show('deletePlacesCategoryModal', this);
    },
    'click .update-action': function () {
        Modal.show('updatePlacesCategoryModal', this);
    }
});