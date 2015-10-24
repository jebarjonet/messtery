InsertHostingFoldersForm = new SimpleSchema({
    name: {
        type: String,
        max: 100,
        autoform: {
            autofocus: true,
            autocomplete: "off"
        }
    }
});