Template.deleteLoginModal.events({
    'click button': function () {
        Logins.remove(this._id, function (err) {
            if (err) {
                notification(err.reason);
                return;
            }

            notification("Login deleted", "success");
            Modal.hide();
        });
    }
});