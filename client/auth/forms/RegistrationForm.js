RegistrationForm = new SimpleSchema({
    username: {
        type: String,
        label: "Nom d'utilisateur",
        min: 4,
        max: 20
    },
    email: {
        type: String,
        label: "Adresse email",
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
        label: "Mot de passe",
        min: 5,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirm: {
        type: String,
        label: "Confirmation du mot de passe",
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