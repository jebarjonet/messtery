Meteor.publish('places', function () {
    if (!this.userId) {
        return [];
    }
    return [
        Places.find(),
        PlacesCategories.find()
    ];
});