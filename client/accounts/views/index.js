Template.accounts.onCreated(function () {
    this.subscribe("accounts");
});

Template.accounts.helpers({
    accounts: function () {
        return Meteor.users.find({}, {
            sort: {
                createdAt: 1
            }
        });
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