LoginsForm = new SimpleSchema({
    domain: {
        type: String,
        max: 300,
        autoform: {
            autocomplete: "off"
        }
    },
    identifier: {
        type: String,
        max: 300,
        autoform: {
            autocomplete: "off"
        }
    },
    password: {
        type: String,
        autoform: {
            autocomplete: "off",
            type: "password"
        }
    }
});