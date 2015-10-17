LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: "Email address or username"
    },
    password: {
        type: String,
        label: "Password",
        autoform: {
            type: "password"
        }
    }
});