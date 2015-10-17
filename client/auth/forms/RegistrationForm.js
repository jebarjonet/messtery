RegistrationForm = new SimpleSchema({
    username: {
        type: String,
        label: "Username",
        min: 4,
        max: 20
    },
    email: {
        type: String,
        label: "Email address",
        min: 4,
        max: 100,
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
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirm: {
        type: String,
        label: "Password repeated",
        autoform: {
            type: "password"
        },
        custom: function() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
        }
    }
});