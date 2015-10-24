Meteor.publish('logins', function () {
    return [
        Logins.find()
    ];
});