var map;

Template.places.hooks({
    rendered: function () {
        map = MapService.setMap('map');

        // observe places
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