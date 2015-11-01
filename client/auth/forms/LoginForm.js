LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: "Email address",
        autoform: {
            type: "email"
        },
        custom: Validators.email
    },
    password: {
        type: String,
        autoform: {
            type: "password"
        }
    }
});