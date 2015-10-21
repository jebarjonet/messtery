Template.accounts.helpers({
    usersCount: function() {
        return this.count();
    },
    emailAddress: function () {
        return this.emails[0].address;
    },
    isAdmin: function () {
        return isAdmin(this._id);
    },
    isActivated: function () {
        return isActivated(this);
    }
});