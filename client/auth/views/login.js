AutoForm.addHooks('loginForm', {
    onSubmit: function (doc) {
        var self = this;
        this.event.preventDefault();

        Meteor.loginWithPassword(doc.email, doc.password, function (error) {
            self.done(error);
        });
    },
    onSuccess: function () {
        Router.go('index');
    }
});