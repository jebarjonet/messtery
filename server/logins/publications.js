Meteor.publish('logins', function () {
    if (!this.userId) {
        return [];
    }
    return [
        Logins.find()
    ];
});