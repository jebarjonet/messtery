Template.accounts.helpers({
    usersCount: function () {
        return this.count();
    },
    isAdmin: function (user) {
        return isAdmin(user);
    },
    isActivated: function () {
        return isActivated(this);
    },
    isDisabled: function () {
        return isDisabled(this);
    }
});

Template.accounts.events({
    'click .disable-action': function () {
        Meteor.users.update({_id: this._id}, {
            $set: {
                disabled: !this.disabled
            }
        });
    },
    'click .delete-action': function () {
        Modal.show('deleteAccountModal', this);
    }
});