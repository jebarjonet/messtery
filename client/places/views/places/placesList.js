var selectedPlace;

Template.listPlaces.hooks({
    created: function () {
        selectedPlace = new ReactiveVar();
    }
});

Template.listPlaces.helpers({
    isSelected: function () {
        return selectedPlace.get() === this._id && (rwindow.screen('lte', 'xsmall') || (rwindow.screen('gt', 'xsmall') && this.text));
    },
    updateLinkData: function () {
        return {id: this._id};
    },
    category: function () {
        return PlacesCategories.findOne(this.category);
    }
});

Template.listPlaces.events({
    'click table tbody tr:not(#extended-description)': function () {
        if (selectedPlace.get() === this._id) {
            selectedPlace.set();
        } else {
            selectedPlace.set(this._id);
        }
    }
});