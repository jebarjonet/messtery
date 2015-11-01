PlacesCategoriesForm = new SimpleSchema({
    name: {
        type: String,
        max: 300,
        autoform: {
            autocomplete: "off"
        }
    },
    color: {
        type: String,
        autoform: {
            type: "bootstrap-minicolors",
            autocomplete: "off"
        }
    },
    icon: {
        type: String,
        autoform: {
            autocomplete: "off"
        }
    }
});