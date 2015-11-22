var map;
// track if map is loaded (map does not load correctly if it loads while being "display: none" during search)
var mapLoaded = new ReactiveVar(false);

Template.places.hooks({
    created: function () {
        mapLoaded.set(false);
    },
    rendered: function () {
        // create map
        map = MapService.setMap('map', function () {
            mapLoaded.set(true);
        });

        // observe places to put on map
        Places.find().observe({
            added: function (place) {
                addPlace(place);
            },
            changed: function (newPlace, oldPlace) {
                removePlace(oldPlace);
                addPlace(newPlace);
            },
            removed: function (oldPlace) {
                removePlace(oldPlace);
            }
        });
    }
});

Template.places.helpers({
    updateLinkData: function () {
        return {id: this._id};
    },
    isSearching: function () {
        return getCurrentSearchQuery();
    },
    isSearchingAndLoaded: function () {
        return getCurrentSearchQuery() && mapLoaded.get();
    },
    places: function () {
        return Places.find({
            $or: [{
                name: {
                    $regex: getCurrentSearchQuery(),
                    $options: "i"
                }
            }, {
                text: {
                    $regex: getCurrentSearchQuery(),
                    $options: "i"
                }
            }]
        }, {
            sort: {
                name: 1
            }
        });
    },
    category: function () {
        return PlacesCategories.findOne(this.category);
    },
    searchQuery: function () {
        return getCurrentSearchQuery();
    }
});

Template.places.events({
    'submit form[name="search"]': function (e) {
        e.preventDefault();
        if (!getFormSearchQuery()) {
            Router.go('places');
        } else {
            Router.go('places', {}, {
                query: 's=' + getFormSearchQuery()
            });
        }
    }
});

function addPlace(place) {
    var popup = document.createElement('div');
    Blaze.renderWithData(Template.markerPopup, place, popup);
    MapService.marker([place.lat, place.lng], place.category)
        .bindPopup(popup, {
            closeButton: false,
            minWidth: 150
        })
        .addTo(map);
}

function removePlace(oldPlace) {
    map.eachLayer(function (layer) {
        if (_.isFunction(layer.getLatLng)) {
            if (layer.getLatLng().lat.toString() === oldPlace.lat && layer.getLatLng().lng.toString() === oldPlace.lng) {
                map.removeLayer(layer);
            }
        }
    });
}

function getFormSearchQuery() {
    return $('form[name="search"] input').val();
}

function getCurrentSearchQuery() {
    return Router.current().params.query.s;
}