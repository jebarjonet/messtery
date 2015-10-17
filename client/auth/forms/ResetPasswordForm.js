ResetPasswordForm = new SimpleSchema({
    password: {
        type: String,
        label: "New password",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirmPassword: {
        type: String,
        label: "New password repeated",
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