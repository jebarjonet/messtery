// Alerts (notifications)
sAlert.config({
    effect: 'stackslide',
    position: 'bottom',
    onRouteClose: false,
    stack: false
});

// Active router
ActiveRoute.configure({
    caseSensitive: false
});

// Autoform hooks
AutoForm.addHooks(null, {
    onError: function (m, err) {
        if (err.reason) {
            notification(err.reason);
        }
    }
});

// Modals options
Modal.allowMultiple = true;