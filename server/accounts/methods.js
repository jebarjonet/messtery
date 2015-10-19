Meteor.methods({
    // send an enrollment email to a target
    enrollUser: function (doc) {
        var newUserId = Accounts.createUser(doc);
        Accounts.sendEnrollmentEmail(newUserId);
        return newUserId;
    }
});