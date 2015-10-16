LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: "Adresse email ou Pseudo"
    },
    password: {
        type: String,
        label: "Mot de passe",
        autoform: {
            type: "password"
        }
    }
});