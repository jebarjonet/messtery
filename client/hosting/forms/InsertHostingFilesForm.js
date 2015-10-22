InsertHostingFilesForm = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 300,
        autoform: {
            autocomplete: "off"
        }
    },
    file: {
        type: String,
        label: 'File',
        autoform: {
            type: "file"
        }
    },
    encrypted: {
        type: Boolean,
        label: 'Encrypted'
    }
});