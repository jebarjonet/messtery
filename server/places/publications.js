Meteor.publish('places', function () {
    if (!this.userId) {
        return [];
    }
    return [
        Places.find({
            owner: this.userId
        }),
        PlacesCategories.find({
            owner: this.userId
        })
    ];
});