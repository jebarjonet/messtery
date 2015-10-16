ChangePasswordForm = new SimpleSchema({
    oldPassword: {
        type: String,
        label: "Mot de passe actuel",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    newPassword: {
        type: String,
        label: "Nouveau mot de passe",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirmNewPassword: {
        type: String,
        label: "Confirmation du nouveau mot de passe",
        autoform: {
            type: "password"
        },
        custom: function() {
            if (this.value !== this.field('newPassword').value) {
                return 'passwordMismatch';
            }
        }
    }
});