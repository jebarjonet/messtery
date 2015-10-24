LoginsForm = new SimpleSchema({
    domain: {
        type: String,
        max: 300
    },
    identifier: {
        type: String,
        max: 300
    },
    password: {
        type: String,
        autoform: {
            type: "password"
        }
    }
});