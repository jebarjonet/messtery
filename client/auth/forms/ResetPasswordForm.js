ResetPasswordForm = new SimpleSchema({
    password: {
        type: String,
        label: "Nouveau mot de passe",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirmPassword: {
        type: String,
        label: "Confirmation du nouveau mot de passe",
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