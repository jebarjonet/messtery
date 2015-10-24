LoginsForm = new SimpleSchema({
    domain: {
        type: String,
        max: 300,
        autoform: {
            autofocus: true,
            autocomplete: "off"
        }
    },
    file: {
        type: String,
        autoform: {
            type: "file"
        }
    },
    encrypted: {
        type: Boolean
    }
});