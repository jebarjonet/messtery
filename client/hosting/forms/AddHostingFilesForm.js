AddHostingFilesForm = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 300
    },
    file: {
        type: String,
        label: 'File',
        autoform: {
            afFieldInput: {
                type: "file"
            }
        }
    },
    encrypted: {
        type: Boolean,
        label: 'Encrypted'
    }
});