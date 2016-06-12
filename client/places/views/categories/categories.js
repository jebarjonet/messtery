Template.categoriesPlaces.onCreated(function () {
    this.subscribe('places');
});

Template.categoriesPlaces.helpers({
    categories: function () {
        return PlacesCategories.find({
            owner: Meteor.userId()
        });
    }
});

Template.categoriesPlaces.events({
    'click .delete-action': function () {
        Modal.show('deletePlacesCategoryModal', this);
    },
    'click .update-action': function () {
        Modal.show('updatePlacesCategoryModal', this);
    }
});