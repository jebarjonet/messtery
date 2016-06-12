var map, formData, draggableMarkerOptions;

Template.placesForm.onCreated(function() {
    this.subscribe('places');
});

Template.placesForm.hooks({
    created: function () {
        draggableMarkerOptions = {
            draggable: true,
            onDrag: updateFormCoordinates
        };

        var editedPlace = getEditedPlace();
        if (editedPlace) {
            formData = {
                title: "Updating the place " + editedPlace.name,
                id: 'updatePlacesForm',
                type: 'update',
                doc: editedPlace
            };
        } else {
            formData = {
                title: "Add a place",
                id: 'insertPlacesForm',
                type: 'insert',
                doc: {}
            };
        }
    },
    rendered: function () {
        map = MapService.setMap('map');

        // mark place if editing
        var editedPlace = getEditedPlace();
        if (editedPlace) {
            MapService.markAndShow(editedPlace.lat, editedPlace.lng, map, draggableMarkerOptions);
        } else {
            MapService.markAndShow(Meteor.settings.public.defaultMapCoordinates.lat, Meteor.settings.public.defaultMapCoordinates.lng, map, draggableMarkerOptions);
        }

        // mark place when changing lat or lng fields
        Tracker.autorun(function () {
            if (AutoForm.getFieldValue("lat", formData.id) && AutoForm.getFieldValue("lng", formData.id)) {
                MapService.markAndShow(AutoForm.getFieldValue("lat", formData.id), AutoForm.getFieldValue("lng", formData.id), map, draggableMarkerOptions);
            }
        });
    }
});

Template.placesForm.helpers({
    hasCategories: function () {
        return PlacesCategories.find().count();
    },
    formData: function () {
        return formData;
    }
});

Template.placesForm.events({
    'click #autocomplete': function () {
        var address = AutoForm.getFieldValue("address", formData.id);
        if (address) {
            GeocodingService.geocode(address, function (res) {
                if (res) {
                    updateFormCoordinates({latlng: res});
                    $('form [name="address"]').val(res.address);
                    MapService.markAndShow(res.lat, res.lng, map, draggableMarkerOptions);
                }
            });
        }
    }
});

AutoForm.addHooks('insertPlacesForm', {
    onSuccess: function () {
        notification('Place added to list', 'success');
        FlowRouter.go('places');
    }
});

AutoForm.addHooks('updatePlacesForm', {
    onSuccess: function () {
        notification('Place updated', 'success');
        FlowRouter.go('places');
    }
});

function getEditedPlace() {
    var id = FlowRouter.getParam("id");
    return id && Places.findOne(id);
}

function updateFormCoordinates(e) {
    var res = e.latlng;
    if (res) {
        $('form [name="lat"]').val(res.lat.toFixed(6));
        $('form [name="lng"]').val(res.lng.toFixed(6));
    }
}