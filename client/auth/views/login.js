AutoForm.addHooks('loginForm', {
    onSubmit: function (doc) {
        var self = this;
        this.event.preventDefault();

        Meteor.loginWithPassword(doc.email, doc.password, function (err) {
            self.done(err);
        });
    },
    onSuccess: function () {
        FlowFlowRouter.go('index');
    }
});