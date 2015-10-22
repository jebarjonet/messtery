UpdateHostingForm = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 300,
        autoform: {
            autocomplete: "off",
            autofocus: true
        }
    }
});