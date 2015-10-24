UpdateHostingForm = new SimpleSchema({
    name: {
        type: String,
        max: 300,
        autoform: {
            autocomplete: "off",
            autofocus: true
        }
    }
});