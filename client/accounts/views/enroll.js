AutoForm.addHooks('enrollmentForm', {
    onSuccess: function () {
        notification("User successfully invited", 'success');
        FlowRouter.go('accounts');
    }
});