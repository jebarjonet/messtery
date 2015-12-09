Meteor.methods({
    // send an enrollment email to a target
    enrollUser: function (doc) {
        onlyAdmins();

        var newUserId = Accounts.createUser(doc);
        Accounts.sendEnrollmentEmail(newUserId);
        return newUserId;
    }
});