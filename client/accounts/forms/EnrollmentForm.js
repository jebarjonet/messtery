EnrollmentForm = new SimpleSchema({
    email: {
        type: String,
        label: "Email address",
        min: 4,
        max: 100,
        autoform: {
            type: "email"
        },
        custom: Validators.email
    }
});