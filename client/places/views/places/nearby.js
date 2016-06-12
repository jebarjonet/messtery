var location, searchingLocation;

Template.nearbyPlaces.onCreated(function() {
    this.subscribe('places');
});

Template.nearbyPlaces.hooks({
    created: function () {
        location = new ReactiveVar();
        searchingLocation = new ReactiveVar(true);

        initLocation();
    },
    rendered: function () {
        map = MapService.setMap('map');

        // mark location when found
        Tracker.autorun(function () {
            if (location.get()) {
                MapService.markAndShow(location.get().lat, location.get().lng, map);
            }
        });
    }
});

Template.nearbyPlaces.helpers({
    geolocationAvailable: function () {
        return GeolocationService.isGeolocationAvailable();
    },
    searchingLocation: function () {
        return searchingLocation.get();
    },
    location: function () {
        return location.get();
    },
    places: function () {
        if (!location.get()) {
            return [];
        }

        var boundaries = GeolocationService.findNearbyBoundaries(location.get(), 0.15);

        return Places.find({
            lat: {
                $lte: boundaries.lat.max.toString(),
                $gte: boundaries.lat.min.toString()
            },
            lng: {
                $lte: boundaries.lng.max.toString(),
                $gte: boundaries.lng.min.toString()
            }
        }, {
            sort: {
                name: 1
            }
        });
    }
});

Template.nearbyPlaces.events({
    'click #retry-geolocation': initLocation
});

function initLocation() {
    searchingLocation.set(true);

    GeolocationService.locate(function (data) {
        searchingLocation.set(false);

        if (data) {
            location.set(data);
        }
    });
}