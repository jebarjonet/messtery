AutoForm.addHooks('enrollmentForm', {
    onSuccess: function () {
        notification("User successfully invited", 'success');
        Router.go('accounts');
    }
});