PlacesForm = new SimpleSchema({
    name: {
        type: String,
        max: 300,
        autoform: {
            autocomplete: "off"
        }
    },
    category: {
        type: String,
        autoform: {
            options: function () {
                return PlacesCategories.find({}, {
                    sort: {
                        name: 1
                    }
                }).map(function (c) {
                    return {
                        label: c.name,
                        value: c._id
                    };
                });
            },
            firstOption: '(Choose a category)'
        }
    },
    text: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },
    address: {
        type: String,
        autoform: {
            autocomplete: "off",
            // prevent submitting form when pressing Enter on this field
            onkeydown: 'if (event.keyCode == 13) {return false}'
        }
    },
    lat: {
        type: String,
        label: "Latitude",
        autoform: {
            autocomplete: "off"
        }
    },
    lng: {
        type: String,
        label: "Longitude",
        autoform: {
            autocomplete: "off"
        }
    }
});