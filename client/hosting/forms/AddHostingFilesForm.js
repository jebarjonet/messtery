AddHostingFilesForm = new SimpleSchema({
    name: {
        type: String,
        label: "Nom",
        max: 300
    },
    file: {
        type: String,
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "files"
            }
        }
    }
});