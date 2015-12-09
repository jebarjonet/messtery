Meteor.methods({
    /**
     * Install what needs to be installed when app has been deployed
     */
    bootApp: function () {
        if (!Meteor.users.find().count()) {
            if (!Meteor.settings.owner.emailAddress) {
                return "Please complete settings.json file";
            }

            var userId = Meteor.call('enrollUser', {email: Meteor.settings.owner.emailAddress});
            Roles.addUsersToRoles(userId, 'admin');
            return "First user successfully created";
        } else {
            return "App already booted";
        }
    },
    /**
     * Migrates objects without owner to first registered user
     */
    migrateV2: function () {
        if (!Meteor.settings.owner.emailAddress) {
            return "Please complete settings.json file";
        }

        var firstUser = Meteor.users.findOne({"emails.address": Meteor.settings.owner.emailAddress});

        if (!firstUser) {
            return "The user was not found";
        }

        var selector = {owner: {$exists: false}},
            update = {$set: {owner: firstUser._id}},
            options = {multi: true};

        HostingFolders.update(selector, update, options);
        HostingFiles.update(selector, update, options);
        Logins.update(selector, update, options);
        Places.update(selector, update, options);
        PlacesCategories.update(selector, update, options);

        return "Successful migration";
    }
});