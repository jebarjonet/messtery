Meteor.publish('boarding', function (token) {
    return [
        Meteor.users.find({
            "services.password.reset.token": token
        })
    ];
});

// Current user data
Meteor.publish(null, function () {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            encryption: 1
        }
    });
});