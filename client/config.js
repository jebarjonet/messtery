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
    onError: function(m, error) {
        notification(error.reason);
    }
});