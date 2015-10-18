LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: "Email address",
        autoform: {
            type: "email"
        },
        custom: function() {
            return validators.email(this.value);
        }
    },
    password: {
        type: String,
        label: "Password",
        autoform: {
            type: "password"
        }
    }
});