Router.map(function () {
    this.route('/places', {
        waitOn: sub
    });
    this.route('/places/nearby', {
        name: 'places.nearby',
        waitOn: sub
    });
    this.route('/places/add', {
        name: 'places.add',
        template: 'placesForm',
        waitOn: sub
    });
    this.route('/places/edit/:id', {
        name: 'places.edit',
        template: 'placesForm',
        waitOn: sub
    });
    this.route('/places/categories', {
        name: 'places.categories',
        waitOn: sub,
        data: function () {
            return PlacesCategories.find({}, {
                sort: {
                    name: 1
                }
            });
        }
    });
    this.route('/places/categories/add', {
        name: 'places.categories.add',
        waitOn: sub
    });
});

function sub() {
    return Meteor.subscribe('places');
}