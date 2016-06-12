Meteor.methods({
    /**
     * Install what needs to be installed when app has been deployed
     */
    bootApp: function () {
        if (!Meteor.users.find().count()) {
            if (!Meteor.settings.owner.emailAddress) {
                return "Please complete settings.json file";
            }
            
            var newUserId = Accounts.createUser({email: Meteor.settings.owner.emailAddress});
            Accounts.sendEnrollmentEmail(newUserId);
            Roles.addUsersToRoles(newUserId, 'admin');
            return "First user successfully created";
        } else {
            return "App already booted";
        }
    }
});