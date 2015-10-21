InsertHostingFoldersForm = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100,
        autoform: {
            afFieldInput: {
                autocomplete: "off"
            }
        }
    }
});