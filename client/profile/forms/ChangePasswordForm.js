ChangePasswordForm = new SimpleSchema({
    oldPassword: {
        type: String,
        label: "Current password",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    newPassword: {
        type: String,
        label: "New password",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirmNewPassword: {
        type: String,
        label: "New password repeated",
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