Template.logins.onCreated(function() {
    this.subscribe('logins');
});

Template.logins.helpers({
    logins: function () {
        var query = {};

        if (isSearching()) {
            query = {
                domain: {
                    $regex: getCurrentSearchQuery(),
                    $options: "i"
                }
            };
        }

        return Logins.find(query, {
            sort: {
                domain: 1
            }
        });
    },
    searchQuery: function () {
        return getCurrentSearchQuery();
    },
    forgetSessionKeysDisabled: function () {
        return EncryptionService.getSessionKeys() ? '' : 'disabled';
    }
});

Template.logins.events({
    'submit form[name="search"]': function (e) {
        e.preventDefault();
        if (!getFormSearchQuery()) {
            FlowRouter.go('logins');
        } else {
            FlowRouter.go('logins', {}, {
                query: 's=' + getFormSearchQuery()
            });
        }
    },
    'click .show-action': function () {
        var self = this;

        EncryptionService.needSessionKeys(function () {
            Modal.show('showLoginModal', decryptedLogin(self));
        });
    },
    'click .delete-action': function () {
        Modal.show('deleteLoginModal', this);
    },
    'click .update-action': function () {
        var self = this;

        EncryptionService.needSessionKeys(function () {
            Modal.show('updateLoginModal', decryptedLogin(self));
        });
    },
    'click #forget-session-keys': function () {
        EncryptionService.forgetSessionKeys();
    }
});

function decryptedLogin(login) {
    login = _.cloneDeep(login);
    login.password = EncryptionService.decrypt(login.password, login.salt);
    return login;
}

function isSearching() {
    return getCurrentSearchQuery();
}

function getFormSearchQuery() {
    return $('form[name="search"] input').val();
}

function getCurrentSearchQuery() {
    return FlowRouter.getQueryParam("s");
}