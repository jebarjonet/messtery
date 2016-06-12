var map;
// track if map is loaded (map does not load correctly if it loads while being "display: none" during search)
var mapLoaded = new ReactiveVar(false);

Template.places.onCreated(function () {
    this.subscribe('places');
    mapLoaded.set(false);
});

Template.places.onRendered(function () {
    // create map
    map = MapService.setMap('map', function () {
        mapLoaded.set(true);
    });

    this.autorun(function () {
        if (this.subscriptionsReady()) {
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
    }.bind(this));
});

Template.places.helpers({
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
    searchQuery: function () {
        return getCurrentSearchQuery();
    },
    subsReady: function () {
        return Template.instance().subscriptionsReady();
    }
});

Template.places.events({
    'submit form[name="search"]': function (e) {
        e.preventDefault();
        if (!getFormSearchQuery()) {
            FlowRouter.go('places');
        } else {
            FlowRouter.go('places', {}, {
                s: getFormSearchQuery()
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
    return FlowRouter.getQueryParam("s");
}