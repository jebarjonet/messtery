Meteor.publish('places', function () {
    return [
        Places.find(),
        PlacesCategories.find()
    ];
});