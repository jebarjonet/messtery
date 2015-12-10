Template.listPlaces.helpers({
    updateLinkData: function () {
        return {id: this._id};
    },
    category: function () {
        return PlacesCategories.findOne(this.category);
    }
});